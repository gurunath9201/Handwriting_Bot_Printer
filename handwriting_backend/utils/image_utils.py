import numpy as np
from PIL import Image, ImageFilter
import cv2

class ImageUtils:
    
    @staticmethod
    def add_ink_variation(image, intensity=0.3):
        """Add ink flow variation to simulate real pen writing"""
        
        img_array = np.array(image)
        
        # Create random ink intensity map
        height, width = img_array.shape[:2]
        ink_map = np.random.normal(1.0, intensity, (height, width))
        ink_map = cv2.GaussianBlur(ink_map, (5, 5), 0)
        
        # Apply to alpha channel
        if img_array.shape[2] == 4:
            img_array[:, :, 3] = np.clip(img_array[:, :, 3] * ink_map, 0, 255)
        
        return Image.fromarray(img_array.astype(np.uint8))
    
    @staticmethod
    def add_pen_pressure(stroke, pressure_map):
        """Simulate varying pen pressure"""
        
        # Apply pressure variations to stroke width and opacity
        modified_stroke = stroke.copy()
        
        # Implementation depends on stroke representation
        return modified_stroke
    
    @staticmethod
    def create_stroke_texture(style='ink'):
        """Create texture for different writing instruments"""
        
        textures = {
            'ink': np.array([[0.9, 1.0, 0.9],
                            [1.0, 1.0, 1.0],
                            [0.9, 1.0, 0.9]]),
            'pencil': np.array([[0.7, 0.8, 0.7],
                               [0.8, 1.0, 0.8],
                               [0.7, 0.8, 0.7]]),
            'ballpoint': np.array([[0.95, 1.0, 0.95],
                                  [1.0, 1.0, 1.0],
                                  [0.95, 1.0, 0.95]])
        }
        
        return textures.get(style, textures['ink'])