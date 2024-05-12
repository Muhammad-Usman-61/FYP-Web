# Import flask and datetime module for showing date and time
from flask import Flask, request
from flask_cors import CORS
from keras.models import load_model
from keras.preprocessing import image
import numpy as np
import io

# Initializing flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

class Predictor:
    def __init__(self):
        try:
            self.custom_model = load_model("new_custom_fyp.h5")
            self.model_lenet = load_model("lenet_fyp.h5")
            self.resNet_model = load_model("model_ResNet50.h5")
            self.vgg_model = load_model("model_vgg16.h5")
            self.mobileNet_model = load_model("model_MobileNetV2.h5")
        except Exception as e:
            print(e)

    def model_predict(self, img_path):
        test_image = image.load_img(img_path, target_size=(128, 128))
        test_image = image.img_to_array(test_image)
        test_image = np.expand_dims(test_image, axis=0)
        # test_image = test_image / 255.0
        result_custom = self.custom_model.predict(test_image)
        result_lenet = self.model_lenet.predict(test_image)
        result_resNet = self.resNet_model.predict(test_image)
        result_vgg = self.vgg_model.predict(test_image)
        result_mobileNet = self.mobileNet_model.predict(test_image)

        return result_custom, result_lenet, result_resNet, result_vgg, result_mobileNet

pre = Predictor()

class_labels = ['Non Demented', 'Mild Demented', 'Moderate Demented', 'Very Mild Demented']

@app.route('/')
def home():
    return "This is the server for FYP Project, Send request on /data endpoint to get result"

# Route for seeing a data
@app.route('/data', methods=['POST','GET'])
def data():
    if request.method == 'POST':
        # Get the file from the POST request
        file = request.files['file']
        
        # Read the file
        img_bytes = file.read()
        # Use io.BytesIO to convert bytes to file-like object
        img = io.BytesIO(img_bytes)

        result_custom, result_lenet, result_resNet, result_vgg, result_mobileNet = pre.model_predict(img)
        # Get the index of the predicted class
        predicted_class_index_custom = np.argmax(result_custom)
        predicted_class_index_lenet = np.argmax(result_lenet)
        predicted_class_index_resNet = np.argmax(result_resNet)
        predicted_class_index_vgg = np.argmax(result_vgg)
        predicted_class_index_mobileNet = np.argmax(result_mobileNet)
        # Get the predicted class name
        predicted_class_custom = class_labels[predicted_class_index_custom]
        predicted_class_lenet = class_labels[predicted_class_index_lenet]
        predicted_class_resNet = class_labels[predicted_class_index_resNet]
        predicted_class_vgg = class_labels[predicted_class_index_vgg]
        predicted_class_mobileNet = class_labels[predicted_class_index_mobileNet]

        accuracy_custom = np.max(result_custom)
        accuracy_lenet = np.max(result_lenet)
        accuracy_resNet = np.max(result_resNet)
        accuracy_vgg = np.max(result_vgg)
        accuracy_mobileNet = np.max(result_mobileNet)

        accuracy_custom = round(float(accuracy_custom * 100), 2)
        accuracy_lenet = round(float(accuracy_lenet * 100), 2)
        accuracy_resNet = round(float(accuracy_resNet * 100), 2)
        accuracy_vgg = round(float(accuracy_vgg * 100), 2)
        accuracy_mobileNet = round(float(accuracy_mobileNet * 100), 2)
        
        return {'predicted_class_custom': predicted_class_custom, 'accuracy_custom': accuracy_custom, 'predicted_class_lenet': predicted_class_lenet, 'accuracy_lenet': accuracy_lenet, 'predicted_class_resNet': predicted_class_resNet, 'accuracy_resNet': accuracy_resNet, 'predicted_class_vgg': predicted_class_vgg, 'accuracy_vgg': accuracy_vgg, 'predicted_class_mobileNet': predicted_class_mobileNet, 'accuracy_mobileNet': accuracy_mobileNet}
    
    return "Send POST request to get result"

# Running app
if __name__ == '__main__':
    app.run(debug=True)
