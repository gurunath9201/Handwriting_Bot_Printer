from PIL import Image, ImageDraw
import numpy as np
from config import Config
import random

class PaperGenerator:
    def __init__(self):
        self.config = Config()
        
    def create_ruled_paper(self):
        """Create realistic A4 ruled paper background"""
        
        # Create base paper with slight off-white color
        paper_color = (252, 251, 248)  # Slight off-white
        paper = Image.new('RGB', (self.config.A4_WIDTH, self.config.A4_HEIGHT), paper_color)
        draw = ImageDraw.Draw(paper)
        
        # Draw margin line (red/pink)
        margin_color = (255, 192, 192)
        margin_x = self.config.MARGIN_LEFT - 20
        draw.line([(margin_x, 0), (margin_x, self.config.A4_HEIGHT)], 
                 fill=margin_color, width=2)
        
        # Draw horizontal ruled lines
        line_color = (200, 200, 255)  # Light blue
        y = self.config.MARGIN_TOP
        
        while y < self.config.A4_HEIGHT - self.config.MARGIN_BOTTOM:
            # Add slight waviness to lines for realism
            points = []
            for x in range(0, self.config.A4_WIDTH, 50):
                y_offset = random.gauss(0, 0.5)  # Slight random offset
                points.append((x, y + y_offset))
            
            # Draw line with slight variations
            for i in range(len(points) - 1):
                draw.line([points[i], points[i + 1]], fill=line_color, width=1)
            
            y += self.config.LINE_HEIGHT
        
        # Add paper texture
        paper = self._add_paper_noise(paper)
        
        return paper
    
    def _add_paper_noise(self, image):
        """Add subtle paper texture"""
        
        # Convert to numpy array
        img_array = np.array(image)
        
        # Add very subtle noise
        noise = np.random.normal(0, 2, img_array.shape)
        img_array = np.clip(img_array + noise, 0, 255).astype(np.uint8)
        
        return Image.fromarray(img_array)
    
    def add_paper_texture(self, image):
        """Add subtle paper texture overlay"""
        
        # Create texture overlay
        texture = Image.new('RGB', image.size, (255, 255, 255))
        
        # Add random specs for paper fiber effect
        img_array = np.array(texture)
        specs = np.random.random(img_array.shape[:2]) > 0.998
        
        for i in range(3):
            img_array[:, :, i][specs] = np.random.randint(230, 245)
        
        texture = Image.fromarray(img_array)
        
        # Blend with original
        return Image.blend(image.convert('RGB'), texture, 0.05)