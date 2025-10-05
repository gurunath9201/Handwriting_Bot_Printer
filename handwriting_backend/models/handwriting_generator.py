import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import random
import math
from config import Config
from utils.image_utils import ImageUtils
from utils.paper_generator import PaperGenerator
from models.style_manager import StyleManager
import cv2
from perlin_noise import PerlinNoise

class HandwritingGenerator:
    def __init__(self):
        self.config = Config()
        self.paper_generator = PaperGenerator()
        self.style_manager = StyleManager()
        self.image_utils = ImageUtils()
        
    def generate(self, text, language='english', style='casual', size='medium', ink_color='#000000', sample_id=None):
        """Generate realistic handwriting on A4 ruled paper with custom ink color"""
        
        # Create A4 ruled paper background
        paper = self.paper_generator.create_ruled_paper()
        
        # Create drawing context with transparency
        overlay = Image.new('RGBA', (self.config.A4_WIDTH, self.config.A4_HEIGHT), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        
        # Get style parameters
        style_params = self.style_manager.get_style_params(language, style, size)
        
        # Parse ink color
        ink_rgb = self._hex_to_rgb(ink_color)
        
        # Translate text if language is Hindi and text is in English
        if language == 'hindi':
            text = self._translate_to_hindi(text)
            print(f"Translated text: {text}")  # Debug print
        
        # Split text into lines with proper word wrapping
        lines = self._wrap_text(text, style_params)
        print(f"Lines after wrapping: {lines}")  # Debug print
        
        # Starting position - proper spacing from pink margin line
        x_start = self.config.MARGIN_LEFT + 30  # 30px spacing from pink margin line
        y_current = self.config.MARGIN_TOP + 50  # Proper spacing from top
        
        # Process each line
        for line_idx, line in enumerate(lines):
            if y_current > self.config.A4_HEIGHT - self.config.MARGIN_BOTTOM:
                break
                
            # Reset x position for new line
            x_current = x_start
            
            # Process each character in the line
            for char_idx, char in enumerate(line):
                if char == ' ':
                    # Handle spaces
                    x_current += style_params['word_spacing']
                    continue
                    
                # Draw character with consistent baseline
                self._draw_character(
                    draw, char, x_current, y_current, 
                    style_params, language, ink_rgb
                )
                
                # Update x position
                x_current += style_params['char_spacing']
            
            # Move to next line
            y_current += self.config.LINE_HEIGHT
        
        # Composite onto paper
        paper.paste(overlay, (0, 0), overlay)
        
        # Apply final post-processing for clear output
        final_image = self._post_process(paper)
        
        # Save the image
        output_path = os.path.join(self.config.OUTPUT_FOLDER, f'{sample_id}.png')
        final_image.save(output_path, 'PNG', dpi=(300, 300))
        
        return output_path
    
    def _wrap_text(self, text, style_params):
        """Wrap text to fit within page margins"""
        words = text.split()
        lines = []
        current_line = []
        current_width = 0
        
        # Calculate max width with reduced right margin
        max_width = self.config.A4_WIDTH - (self.config.MARGIN_LEFT + self.config.MARGIN_RIGHT + 60)
        
        for word in words:
            # Estimate word width
            word_width = len(word) * style_params['char_spacing'] + style_params['word_spacing']
            
            if current_width + word_width <= max_width or not current_line:
                current_line.append(word)
                current_width += word_width
            else:
                lines.append(' '.join(current_line))
                current_line = [word]
                current_width = word_width
        
        if current_line:
            lines.append(' '.join(current_line))
        
        return lines if lines else [text]
    
    def _translate_to_hindi(self, text):
        """Translate English text to Hindi using comprehensive mapping"""
        if not text or not text.strip():
            return "हिंदी में स्वागत है"
            
        text = text.strip()
        print(f"Original text for translation: '{text}'")  # Debug print
        
        # Comprehensive English to Hindi translation mapping
        translation_map = {
            # Basic greetings and common words
            'hello': 'नमस्ते', 'hi': 'नमस्ते', 
            'good morning': 'शुभ प्रभात', 'good afternoon': 'शुभ दोपहर',
            'good evening': 'शुभ संध्या', 'good night': 'शुभ रात्रि',
            'thank you': 'धन्यवाद', 'thanks': 'शुक्रिया',
            'please': 'कृपया', 'sorry': 'क्षमा करें',
            'yes': 'हाँ', 'no': 'नहीं', 'ok': 'ठीक है',
            
            # Pronouns
            'i': 'मैं', 'you': 'आप', 'he': 'वह', 'she': 'वह', 
            'we': 'हम', 'they': 'वे', 'me': 'मुझे',
            'my': 'मेरा', 'your': 'आपका', 'our': 'हमारा', 'their': 'उनका',
            
            # Common verbs
            'is': 'है', 'am': 'हूँ', 'are': 'हैं', 'was': 'था',
            'have': 'है', 'has': 'है', 'do': 'करता', 'does': 'करता',
            'can': 'सकता', 'will': 'गा',
            
            # Question words
            'what': 'क्या', 'when': 'कब', 'where': 'कहाँ', 'why': 'क्यों',
            'how': 'कैसे', 'who': 'कौन',
            
            # Common nouns
            'name': 'नाम', 'time': 'समय', 'day': 'दिन', 
            'person': 'व्यक्ति', 'people': 'लोग', 
            'friend': 'दोस्त', 'family': 'परिवार', 'home': 'घर',
            'food': 'भोजन', 'water': 'पानी', 'school': 'विद्यालय',
            'work': 'काम', 'city': 'शहर', 'country': 'देश',
            
            # Project related terms - FIXED TRANSLATIONS
            'project': 'परियोजना', 'capstone': 'कैपस्टोन', 
            'handwriting': 'हस्तलेखन', 'bot': 'बॉट', 
            'printer': 'मुद्रक', 'generative': 'जनरेटिव',
            'ai': 'कृत्रिम बुद्धिमत्ता', 'artificial': 'कृत्रिम',
            'intelligence': 'बुद्धिमत्ता', 'using': 'उपयोग कर रहा है',
            'this': 'यह', 'that': 'वह', 'these': 'ये',
            
            # Common adjectives
            'good': 'अच्छा', 'bad': 'बुरा', 'big': 'बड़ा', 'small': 'छोटा',
            'beautiful': 'सुंदर', 'new': 'नया', 'old': 'पुराना',
            
            # Demo text translations
            'our capstone project': 'हमारी कैपस्टोन परियोजना',
            'handwriting bot': 'हस्तलेखन बॉट',
            'generative ai': 'जनरेटिव एआई',
            'demo text': 'डेमो पाठ',
            'sample text': 'नमूना पाठ',
            'test': 'परीक्षण',
            'demo': 'डेमो',
            'example': 'उदाहरण',
            
            # Numbers
            'one': 'एक', 'two': 'दो', 'three': 'तीन', 'four': 'चार', 'five': 'पाँच',
            'six': 'छह', 'seven': 'सात', 'eight': 'आठ', 'nine': 'नौ', 'ten': 'दस',
        }
        
        # Convert to lowercase for matching but preserve original for display
        original_text = text
        lower_text = text.lower()
        
        print(f"Text to translate: '{lower_text}'")  # Debug print
        
        # First check for exact phrase matches
        translated_text = original_text
        for english_phrase in sorted(translation_map.keys(), key=len, reverse=True):
            if english_phrase in lower_text:
                hindi_phrase = translation_map[english_phrase]
                # Replace the phrase while preserving case
                start_idx = lower_text.find(english_phrase)
                if start_idx != -1:
                    # Replace the exact phrase found
                    before = translated_text[:start_idx]
                    after = translated_text[start_idx + len(english_phrase):]
                    translated_text = before + hindi_phrase + after
                    lower_text = lower_text.replace(english_phrase, hindi_phrase, 1)
                print(f"Translated '{english_phrase}' to '{hindi_phrase}'")  # Debug print
        
        # If no translation occurred, provide a meaningful Hindi text
        if translated_text == original_text:
            if len(original_text.split()) > 2:
                translated_text = "यह हस्तलेखन परियोजना का प्रदर्शन है"
            else:
                translated_text = "हिंदी में स्वागत है"
        
        print(f"Final translated text: '{translated_text}'")  # Debug print
        return translated_text
    
    def _hex_to_rgb(self, hex_color):
        """Convert hex color to RGB tuple"""
        hex_color = hex_color.lstrip('#')
        if len(hex_color) == 6:
            return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        elif len(hex_color) == 3:
            return tuple(int(hex_color[i:i+1] * 2, 16) for i in (0, 1, 2))
        else:
            return (0, 0, 0)  # Default to black
    
    def _draw_character(self, draw, char, x, y, style_params, language, ink_rgb):
        """Draw a single character with clean, readable styling"""
        
        # Create temporary image for the character
        char_size = 120
        char_img = Image.new('RGBA', (char_size, char_size), (0, 0, 0, 0))
        char_draw = ImageDraw.Draw(char_img)
        
        # Load appropriate font
        font_path = self.style_manager.get_font_path(language, style_params['style'])
        font_size = style_params['font_size']
        
        try:
            # Try to load the specified font
            font = ImageFont.truetype(font_path, font_size)
            print(f"Loaded font: {font_path} with size {font_size}")  # Debug print
        except Exception as e:
            print(f"Font loading failed: {e}")  # Debug print
            try:
                # Fallback to default font
                font = ImageFont.load_default()
                print("Using default font")  # Debug print
            except:
                print("Failed to load any font")  # Debug print
                return
        
        # Get character metrics for proper alignment
        try:
            bbox = char_draw.textbbox((0, 0), char, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            # Calculate position to center character
            text_x = (char_size - text_width) // 2
            text_y = (char_size - text_height) // 2
            
            print(f"Character '{char}' - Width: {text_width}, Height: {text_height}")  # Debug print
        except Exception as e:
            print(f"Bbox calculation failed: {e}")  # Debug print
            # Fallback positioning
            text_x = char_size // 2 - 15
            text_y = char_size // 2 - 20
        
        # Draw character with full opacity for clear text
        ink_r, ink_g, ink_b = ink_rgb
        main_color = (ink_r, ink_g, ink_b, 255)  # Full opacity
        
        # Main character stroke - clean and clear
        try:
            char_draw.text((text_x, text_y), char, font=font, fill=main_color)
            print(f"Successfully drew character: '{char}'")  # Debug print
        except Exception as e:
            print(f"Failed to draw character '{char}': {e}")  # Debug print
            return
        
        # Calculate final position
        char_width, char_height = char_img.size
        paste_x = int(x) - char_width // 2
        paste_y = int(y) - char_height // 2
        
        # Paste character onto main canvas
        draw._image.paste(char_img, (paste_x, paste_y), char_img)
    
    def _post_process(self, image):
        """Apply final post-processing for clear output"""
        # Just return the image as-is for maximum clarity
        return image