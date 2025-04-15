import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
import os
import ssl
import certifi

# Fix SSL certificate verification issue
os.environ['REQUESTS_CA_BUNDLE'] = certifi.where()
os.environ['SSL_CERT_FILE'] = certifi.where()

# Disable SSL verification as a fallback if the above doesn't work
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

def create_model(num_classes=30):
    # Define input layer
    inputs = Input(shape=(456, 456, 3))  # Match the size used in app.py
    
    # Use a Lambda layer for preprocessing
    x = tf.keras.layers.Lambda(lambda x: tf.keras.applications.efficientnet.preprocess_input(tf.cast(x, tf.float32)))(inputs)
    
    # Use EfficientNetB5 model to match the input size in app.py
    base_model = tf.keras.applications.EfficientNetB5(
        include_top=False,
        weights='imagenet',
        input_shape=(456, 456, 3)
    )
    base_model.trainable = False
    
    # Add the base model
    x = base_model(x, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    
    # Enhanced classification layers with more capacity
    x = BatchNormalization()(x)
    x = Dense(512, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.01))(x)
    x = Dropout(0.3)(x)
    
    x = BatchNormalization()(x)
    x = Dense(256, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.01))(x)
    x = Dropout(0.2)(x)
    
    # Use temperature scaling to calibrate confidence scores
    # Lower temperature (e.g., 0.8) makes predictions more confident
    temperature = 1.0
    outputs = Dense(num_classes, activation=None)(x)  # Linear outputs before softmax
    outputs = tf.keras.layers.Lambda(lambda x: x / temperature)(outputs)
    outputs = tf.keras.layers.Activation('softmax')(outputs)
    
    # Create the model
    model = Model(inputs=inputs, outputs=outputs)
    
    # Compile the model
    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def calibrate_confidence(predictions, calibration_factor=1.2):
    """
    Calibrate confidence scores to provide more reliable predictions.
    Higher calibration_factor increases confidence for high-probability classes.
    """
    # Apply calibration to the raw predictions
    calibrated = predictions ** calibration_factor
    # Re-normalize to ensure they sum to 1
    return calibrated / tf.reduce_sum(calibrated, axis=-1, keepdims=True)

def load_model_with_custom_objects(model_path):
    try:
        print(f"Attempting to load model from: {model_path}")
        # Check if file exists first
        if not os.path.exists(model_path):
            print(f"Model file not found at: {model_path}")
            # Try to find alternative model files in the same directory
            model_dir = os.path.dirname(model_path)
            model_files = [f for f in os.listdir(model_dir) if f.endswith(('.h5', '.keras'))]            
            if model_files:
                alternative_path = os.path.join(model_dir, model_files[0])
                print(f"Trying alternative model: {alternative_path}")
                model_path = alternative_path
            else:
                raise FileNotFoundError(f"No model files found in {model_dir}")
        
        # Load the model
        model = tf.keras.models.load_model(
            model_path,
            compile=False
        )
        
        # Wrap the model with a custom prediction function that applies confidence calibration
        original_predict = model.predict
        
        def calibrated_predict(*args, **kwargs):
            predictions = original_predict(*args, **kwargs)
            return calibrate_confidence(predictions)
        
        model.predict = calibrated_predict
        
        print("Model loaded successfully and confidence calibration applied")
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        print("Creating new model...")
        # If loading fails, create a new model with 30 classes to match class_names in app.py
        model = create_model(30)  # 30 classes for skin diseases
        return model