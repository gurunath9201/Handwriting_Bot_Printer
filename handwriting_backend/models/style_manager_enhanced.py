import os
import json
from config import Config

class EnhancedStyleManager:
    """Enhanced style manager with more realistic handwriting styles"""
    
    def __init__(self):
        self.config = Config()
        self.advanced_styles = self._load_advanced_styles()
        
    def _load_advanced_styles(self):
        """Load advanced style configurations"""
        
        return {
            'english': {
                'doctor': {
                    'font_size': 28,
                    'char_spacing': 22,
                    'word_spacing': 35,
                    'rotation_var': 5,
                    'slant': 12,
                    'pressure_var': 0.4,
                    'baseline_var': 4,
                    'speed': 'fast',
                    'legibility': 0.6,
                    'pen_type': 'ballpoint'
                },
                'child': {
                    'font_size': 36,
                    'char_spacing': 35,
                    'word_spacing': 50,
                    'rotation_var': 8,
                    'slant': -2,
                    'pressure_var': 0.5,
                    'baseline_var': 6,
                    'speed': 'slow',
                    'legibility': 0.8,
                    'pen_type': 'pencil'
                },
                'artistic': {
                    'font_size': 32,
                    'char_spacing': 30,
                    'word_spacing': 45,
                    'rotation_var': 2,
                    'slant': 7,
                    'pressure_var': 0.3,
                    'baseline_var': 2,
                    'speed': 'medium',
                    'legibility': 0.9,
                    'pen_type': 'fountain'
                },
                'hurried': {
                    'font_size': 26,
                    'char_spacing': 20,
                    'word_spacing': 32,
                    'rotation_var': 6,
                    'slant': 15,
                    'pressure_var': 0.4,
                    'baseline_var': 5,
                    'speed': 'very_fast',
                    'legibility': 0.65,
                    'pen_type': 'ballpoint'
                },
                'vintage': {
                    'font_size': 30,
                    'char_spacing': 28,
                    'word_spacing': 42,
                    'rotation_var': 1,
                    'slant': 5,
                    'pressure_var': 0.2,
                    'baseline_var': 1,
                    'speed': 'slow',
                    'legibility': 0.95,
                    'pen_type': 'fountain',
                    'aged': True
                }
            },
            'hindi': {
                'modern': {
                    'font_size': 34,
                    'char_spacing': 30,
                    'word_spacing': 45,
                    'rotation_var': 2,
                    'slant': 0,
                    'pressure_var': 0.25,
                    'baseline_var': 2,
                    'speed': 'medium',
                    'legibility': 0.9,
                    'pen_type': 'gel'
                },
                'calligraphy': {
                    'font_size': 38,
                    'char_spacing': 35,
                    'word_spacing': 52,
                    'rotation_var': 1,
                    'slant': 0,
                    'pressure_var': 0.4,
                    'baseline_var': 1,
                    'speed': 'very_slow',
                    'legibility': 0.98,
                    'pen_type': 'fountain'
                },
                'student': {
                    'font_size': 32,
                    'char_spacing': 28,
                    'word_spacing': 42,
                    'rotation_var': 4,
                    'slant': 0,
                    'pressure_var': 0.35,
                    'baseline_var': 3,
                    'speed': 'medium',
                    'legibility': 0.85,
                    'pen_type': 'ballpoint'
                }
            }
        }
    
    def get_speed_params(self, speed):
        """Get parameters based on writing speed"""
        
        speed_params = {
            'very_slow': {
                'stroke_width_var': 0.1,
                'connection_strength': 0.9,
                'letter_consistency': 0.95
            },
            'slow': {
                'stroke_width_var': 0.15,
                'connection_strength': 0.8,
                'letter_consistency': 0.9
            },
            'medium': {
                'stroke_width_var': 0.2,
                'connection_strength': 0.7,
                'letter_consistency': 0.85
            },
            'fast': {
                'stroke_width_var': 0.3,
                'connection_strength': 0.6,
                'letter_consistency': 0.75
            },
            'very_fast': {
                'stroke_width_var': 0.4,
                'connection_strength': 0.5,
                'letter_consistency': 0.65
            }
        }
        
        return speed_params.get(speed, speed_params['medium'])
    
    def get_pen_characteristics(self, pen_type):
        """Get characteristics of different pen types"""
        
        pen_chars = {
            'ballpoint': {
                'color': (0, 0, 100),
                'opacity': 0.9,
                'bleed': 0.05,
                'texture': 'smooth',
                'width_range': (1.0, 1.2)
            },
            'fountain': {
                'color': (0, 0, 80),
                'opacity': 0.85,
                'bleed': 0.15,
                'texture': 'wet',
                'width_range': (0.8, 1.5)
            },
            'pencil': {
                'color': (60, 60, 60),
                'opacity': 0.7,
                'bleed': 0,
                'texture': 'grainy',
                'width_range': (0.9, 1.3)
            },
            'gel': {
                'color': (0, 0, 90),
                'opacity': 0.95,
                'bleed': 0.08,
                'texture': 'smooth',
                'width_range': (1.0, 1.1)
            }
        }
        
        return pen_chars.get(pen_type, pen_chars['ballpoint'])