import os
import random
from config import Config

class StyleManager:
    def __init__(self):
        self.config = Config()
        self.styles = self._initialize_styles()
        
    def _initialize_styles(self):
        """Initialize style parameters for clean, readable handwriting"""
        
        return {
            'english': {
                'casual': {
                    'font_size': 42,
                    'char_spacing': 35,
                    'word_spacing': 70,
                    'char_width': 32,
                    'rotation_var': 0,
                    'slant': 0,
                    'pen_type': 'ink',
                    'style': 'casual'
                },
                'formal': {
                    'font_size': 40,
                    'char_spacing': 38,
                    'word_spacing': 75,
                    'char_width': 35,
                    'rotation_var': 0,
                    'slant': 0,
                    'pen_type': 'ink',
                    'style': 'formal'
                }
            },
            'hindi': {
                'casual': {
                    'font_size': 46,  # Increased for better readability
                    'char_spacing': 42,
                    'word_spacing': 80,
                    'char_width': 40,
                    'rotation_var': 0,
                    'slant': 0,
                    'pen_type': 'ink',
                    'style': 'casual'
                },
                'formal': {
                    'font_size': 44,
                    'char_spacing': 45,
                    'word_spacing': 85,
                    'char_width': 42,
                    'rotation_var': 0,
                    'slant': 0,
                    'pen_type': 'ink',
                    'style': 'formal'
                }
            }
        }
    
    def get_style_params(self, language, style, size):
        """Get style parameters with size adjustments"""
        
        base_params = self.styles.get(language, {}).get(style, self.styles['hindi']['casual'])
        
        # Apply size multiplier
        size_multipliers = {
            'small': 0.85,
            'medium': 1.0,
            'large': 1.15
        }
        
        multiplier = size_multipliers.get(size, 1.0)
        
        # Scale size-related parameters
        scaled_params = base_params.copy()
        scaled_params['font_size'] = int(base_params['font_size'] * multiplier)
        scaled_params['char_spacing'] = int(base_params['char_spacing'] * multiplier)
        scaled_params['word_spacing'] = int(base_params['word_spacing'] * multiplier)
        scaled_params['char_width'] = int(base_params['char_width'] * multiplier)
        
        return scaled_params
    
    def get_font_path(self, language, style):
        """Get the font file path for the given language and style"""
        
        # Map to actual font files - USING FONTS THAT SUPPORT HINDI
        font_map = {
            'english': {
                'casual': 'fonts/english/Kalam-Regular.ttf',
                'formal': 'fonts/english/GreatVibes-Regular.ttf'
            },
            'hindi': {
                'casual': 'fonts/hindi/NotoSansDevanagari-Regular.ttf',
                'formal': 'fonts/hindi/NotoSerifDevanagari-Regular.ttf'
            }
        }
        
        # Default fonts that support Hindi
        default_english_font = 'fonts/english/Kalam-Regular.ttf'
        default_hindi_font = 'fonts/hindi/NotoSansDevanagari-Regular.ttf'
        
        try:
            font_path = font_map.get(language, {}).get(style, 
                      default_hindi_font if language == 'hindi' else default_english_font)
            
            # Check if font file exists
            if os.path.exists(font_path):
                return font_path
            else:
                print(f"Font file not found: {font_path}")
                # Fallback to fonts that definitely support Hindi
                if language == 'hindi':
                    # Try different Hindi font paths
                    hindi_fonts = [
                        'fonts/hindi/NotoSansDevanagari-Regular.ttf',
                        'fonts/hindi/Lohit-Devanagari.ttf',
                        'fonts/hindi/Kalam-Regular.ttf',  # Kalam supports Devanagari
                        '/usr/share/fonts/truetype/noto/NotoSansDevanagari-Regular.ttf',
                        'C:/Windows/Fonts/arial.ttf'  # Arial supports basic Devanagari
                    ]
                    for font in hindi_fonts:
                        if os.path.exists(font):
                            return font
                
                return default_hindi_font if language == 'hindi' else default_english_font
                
        except Exception as e:
            print(f"Error getting font path: {e}")
            return default_hindi_font if language == 'hindi' else default_english_font