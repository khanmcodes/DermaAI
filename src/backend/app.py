from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import base64
import io
from PIL import Image
from flask_cors import CORS
import os
from tensorflow.keras.applications.efficientnet_v2 import preprocess_input

app = Flask(__name__)
CORS(app)

# Load the model
model_path = os.path.join(os.path.dirname(__file__), 'models/final_model.keras')
model = tf.keras.models.load_model(model_path)
print("✅ Model loaded. Expected input shape:", model.input_shape)

# Class names (5 skin diseases)
class_names = [
    'Atopic Dermatitis',
    'Eczema',
    'Psoriasis',
    'Seborrheic Keratoses',
    'Tinea Ringworm Candidiasis'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        image_data = data['image']
        if 'base64,' in image_data:
            image_data = image_data.split('base64,')[1]
        
        try:
            decoded_image = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(decoded_image)).convert('RGB')
            image = image.resize((224, 224))  # Match your model's input shape (224x224)
            image_array = np.array(image)
            image_array = preprocess_input(image_array)
            image_array = np.expand_dims(image_array, axis=0)

            print("Input shape:", image_array.shape)
            print("Pixel range:", image_array.min(), "-", image_array.max())

        except Exception as e:
            return jsonify({'error': f'Error preprocessing image: {str(e)}'}), 500

        try:
            predictions = model.predict(image_array)
            predicted_class_index = int(np.argmax(predictions[0]))
            predicted_class = class_names[predicted_class_index]
            confidence = float(predictions[0][predicted_class_index] * 100)

            top_indices = np.argsort(predictions[0])[-3:][::-1]
            top_predictions = [
                {
                    'class': class_names[i],
                    'confidence': float(predictions[0][i] * 100)
                }
                for i in top_indices if i != predicted_class_index
            ]

            # Generate recommendation
            if confidence < 10:
                recommendation = "The confidence is very low. Consider taking a clearer image with better lighting and focus on the affected area."
            elif confidence < 30:
                recommendation = "The confidence is low. This is a preliminary result only. Please consult with a dermatologist for proper diagnosis."
            elif confidence < 60:
                recommendation = "This is a moderate confidence prediction. Consider the alternative diagnoses and consult with a healthcare professional."
            else:
                recommendation = "This is a high confidence prediction, but always consult with a healthcare professional for confirmation."

            return jsonify({
                'prediction': predicted_class,
                'confidence': round(confidence, 2),
                'all_confidences': {
                    class_names[i]: float(pred * 100) for i, pred in enumerate(predictions[0])
                },
                'top_alternatives': top_predictions,
                'recommendation': recommendation
            })

        except Exception as e:
            return jsonify({'error': f'Error making prediction: {str(e)}'}), 500

    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
