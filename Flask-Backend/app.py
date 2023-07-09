from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.densenet import preprocess_input
from tensorflow.keras.applications.vgg16 import preprocess_input as preprocess_input_mri
import numpy as np
import os
from flask_cors import CORS
import json

app = Flask(__name__)
app.debug = True
CORS(app)

# Load the CT scan model
ctmodel = load_model('Models/ct-scan/chest_CT_SCAN-DenseNet201.hdf5')

# Load the MRI model
mrimodel = load_model('Models/MRI/VGG16-Brain-Tumor-MRI-3.h5')

# Load the pneumonia model
pneumonia_model = load_model("Models/PNEUMONIA/pneumonia_model.h5")

# Load the Cancer model
cancerModel = load_model("Models\LUNG-CANCER\lung cancer_final_99.h5")
cancerModel.compile(optimizer='rmsprop',
                    loss=tf.keras.losses.SparseCategoricalCrossentropy(
                        from_logits=True),
                    metrics=['accuracy'])


class NumpyInt64Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.int64):
            return int(obj)
        return super().default(obj)


@app.route('/predict-ct', methods=['POST'])
def predict_ct():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    # Load and preprocess the image
    img = request.files['image']
    img_path = f"tmp/{img.filename}"  # Save the file temporarily
    img.save(img_path)

    img = image.load_img(img_path, target_size=(460, 460))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)

    # Make predictions on the image
    predictions = ctmodel.predict(img)

    # Interpret the predictions
    class_labels = ['Adenocarcinoma', 'Large.cell.carcinoma',
                    'Normal', 'Squamous.cell.carcinoma']
    predicted_class_index = np.argmax(predictions, axis=1)
    predicted_class_label = class_labels[predicted_class_index[0]]

    # Prepare the response
    response = {
        'predicted_class': predicted_class_label,
        'probability': float(predictions[0][predicted_class_index[0]]) * 100
    }

    # Remove the temporary image file
    os.remove(img_path)

    # Return the response in JSON format
    return jsonify(response)


@app.route('/predict-mri', methods=['POST'])
def predict_mri():
    # Check if an image file is provided in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    # Load and preprocess the image
    img = request.files['image']
    img_path = f"tmp/{img.filename}"  # Save the file temporarily
    img.save(img_path)

    img = image.load_img(img_path, target_size=(460, 460))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input_mri(img)

    print("Predicting MRI")
    # Make predictions on the image
    predictions = mrimodel.predict(img)

    # Interpret the predictions
    class_labels = ['Pituitary', 'Notumor', 'Meningioma', 'Glioma']
    predicted_class_index = np.argmax(predictions, axis=1)
    predicted_class_label = class_labels[predicted_class_index[0]]
    print(predictions)
    # Prepare the response
    response = {
        'predicted_class': predicted_class_label,
        'probability': float(predictions[0][predicted_class_index[0]]) * 100
    }

    # Remove the temporary image file
    os.remove(img_path)

    # Return the response in JSON format
    return jsonify(response)


@app.route('/pneumonia', methods=['POST'])
def pneumonia_prediction():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    # Load and preprocess the image
    img = request.files['image']
    img_path = f"tmp/{img.filename}"  # Save the file temporarily
    img.save(img_path)

    test_image = image.load_img(img_path, target_size=(460, 460))
    test_image = image.img_to_array(test_image)
    test_image = np.expand_dims(test_image, axis=0)
    test_image = test_image / 255.0
    # test_image = preprocess_input_resnet(test_image)

    prediction = pneumonia_model.predict(test_image)
    print("Prediction: ", prediction)
    if prediction[0][0] < 0.5:
        statistic = (1.0-prediction[0]) * 100
        result = {
            'predicted_class': 'Normal',
            'probability': float(statistic)
        }
    else:
        statistic = prediction[0] * 100
        result = {
            'predicted_class': 'PNEUMONIA',
            'probability': float(statistic)
        }
    # Remove the temporary image file
    os.remove(img_path)

    return jsonify(result)


@app.route('/cancer-prediction', methods=['POST'])
def cancer_prediction():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    # Load and preprocess the image
    img = request.files['image']
    img_path = f"tmp/{img.filename}"  # Save the file temporarily
    img.save(img_path)

    test_image = image.load_img(img_path, target_size=(460, 460))
    test_image = image.img_to_array(test_image)
    test_image = np.expand_dims(test_image, axis=0)
    test_image = test_image / 255.0

    predictionsCancer = cancerModel.predict(test_image)
    print(predictionsCancer)

    predicted_class = np.argmax(predictionsCancer)

    if predicted_class == 0:
        result = {'predicted_class': 'Benign',
                  'probability': float(predictionsCancer[0][0])*100}
    elif predicted_class == 1:
        result = {'predicted_class': 'Malignant',
                  'probability': float(predictionsCancer[0][1])*100}
    else:
        result = {'predicted_class': 'Normal',
                  'probability': float(predictionsCancer[0][2])*100}

    os.remove(img_path)
    return jsonify(result)


@app.route('/', methods=['GET'])
def welcome():
    return "Hi"


if __name__ == '__main__':
    app.run(port=8000)
