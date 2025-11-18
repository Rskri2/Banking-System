import base64
from PIL import Image
import cv2
from deepface import DeepFace
import io
import base64
import io
from PIL import Image

def b64_to_file(image_b64: str, filename="images/temp.jpg") -> str:
    if "," in image_b64:
        image_b64 = image_b64.split(",")[1]

    try:
        img_bytes = base64.b64decode(image_b64)
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img.save(filename, format="JPEG")
        return filename
    except Exception as e:
        print("Error decoding image:", e)
        raise

def crop_face(path):
    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    if len(faces) == 0:
        raise ValueError(f"No face detected in {path}")
    x, y, w, h = faces[0]
    cropped = img[y:y+h, x:x+w]
    cv2.imwrite(path, cropped)
    return path


def verify_face(uploaded_path, stored_path) -> bool:
    """
    Compare two images using DeepFace and return True if faces match.
    """
    try:
   
        crop_face(uploaded_path)
        crop_face(stored_path)
        result = DeepFace.verify(
            uploaded_path,   # positional: user-uploaded image
            stored_path,     # positional: reference image
            model_name="Facenet",
            enforce_detection=True
        )
        return result["verified"]
    except Exception as e:
        print("Face verification error:", e)
        return False
