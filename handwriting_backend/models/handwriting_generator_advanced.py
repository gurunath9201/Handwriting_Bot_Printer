import numpy as np
from PIL import Image, ImageDraw, ImageFont
import bezier
import random
import math
from scipy.interpolate import splprep, splev

class AdvancedHandwritingGenerator:
    """Advanced handwriting generation with bezier curves and natural strokes"""
    
    def __init__(self):
        self.stroke_cache = {}
        
    def generate_character_path(self, char, style_params):
        """Generate natural bezier curve path for character"""
        
        # Get character outline points
        points = self._get_character_outline(char)
        
        if not points:
            return []
        
        # Add natural variations
        points = self._add_hand_tremor(points, style_params)
        
        # Create smooth bezier curves
        curves = self._create_bezier_curves(points)
        
        # Add pen lifting points for realistic strokes
        strokes = self._segment_into_strokes(curves, char)
        
        return strokes
    
    def _get_character_outline(self, char):
        """Extract outline points from character"""
        
        # This would use fonttools to get actual glyph outlines
        # Simplified version here
        if char.lower() in 'aeiou':
            # Vowels - simple curves
            angles = np.linspace(0, 2*np.pi, 20)
            points = [(np.cos(a)*20, np.sin(a)*30) for a in angles]
        else:
            # Consonants - more complex
            points = self._generate_consonant_points(char)
        
        return points
    
    def _add_hand_tremor(self, points, style_params):
        """Add natural hand tremor to points"""
        
        tremor_amount = style_params.get('pressure_var', 0.2) * 2
        
        modified_points = []
        for x, y in points:
            # Add small random tremor
            x += random.gauss(0, tremor_amount)
            y += random.gauss(0, tremor_amount)
            modified_points.append((x, y))
        
        return modified_points
    
    def _create_bezier_curves(self, points):
        """Create smooth bezier curves through points"""
        
        if len(points) < 4:
            return [points]
        
        # Use scipy for smooth interpolation
        points = np.array(points)
        tck, u = splprep([points[:, 0], points[:, 1]], s=0, per=False)
        
        # Generate smooth curve
        u_new = np.linspace(0, 1, 100)
        smooth_points = splev(u_new, tck)
        
        return list(zip(smooth_points[0], smooth_points[1]))
    
    def _segment_into_strokes(self, curve, char):
        """Segment curve into natural pen strokes"""
        
        # Different characters have different stroke patterns
        if char.lower() in 'it':
            # Letters with dots/crosses
            return self._segment_with_lifts(curve, 2)
        elif char.lower() in 'aeo':
            # Single stroke letters
            return [curve]
        else:
            # Multi-stroke letters
            return self._segment_with_lifts(curve, 1)
    
    def _segment_with_lifts(self, curve, num_lifts):
        """Segment curve with pen lifts"""
        
        segment_size = len(curve) // (num_lifts + 1)
        segments = []
        
        for i in range(num_lifts + 1):
            start = i * segment_size
            end = (i + 1) * segment_size if i < num_lifts else len(curve)
            segments.append(curve[start:end])
        
        return segments
    
    def _generate_consonant_points(self, char):
        """Generate points for consonant characters"""
        
        # Simplified consonant generation
        # In reality, would use font metrics
        base_points = [
            (0, 0), (10, -20), (15, -25), (20, -20),
            (25, 0), (20, 5), (10, 5), (0, 0)
        ]
        
        # Add character-specific variations
        char_offset = ord(char.lower()) - ord('a')
        rotation = (char_offset * 15) % 360
        
        # Rotate points
        rotated = []
        for x, y in base_points:
            rad = math.radians(rotation)
            x_rot = x * math.cos(rad) - y * math.sin(rad)
            y_rot = x * math.sin(rad) + y * math.cos(rad)
            rotated.append((x_rot, y_rot))
        
        return rotated
    
    def apply_pen_dynamics(self, stroke, pen_params):
        """Apply realistic pen dynamics to stroke"""
        
        # Vary width based on speed and pressure
        width_profile = self._generate_width_profile(len(stroke), pen_params)
        
        # Apply ink flow variations
        opacity_profile = self._generate_opacity_profile(len(stroke), pen_params)
        
        enhanced_stroke = []
        for i, point in enumerate(stroke):
            enhanced_stroke.append({
                'position': point,
                'width': width_profile[i],
                'opacity': opacity_profile[i]
            })
        
        return enhanced_stroke
    
    def _generate_width_profile(self, length, pen_params):
        """Generate realistic stroke width profile"""
        
        base_width = pen_params.get('base_width', 2.0)
        width_range = pen_params.get('width_range', (0.8, 1.2))
        
        # Start thin, get thicker in middle, thin at end
        profile = []
        for i in range(length):
            t = i / max(length - 1, 1)
            
            # Bell curve for width
            width_factor = math.exp(-(t - 0.5)**2 / 0.1)
            width = base_width * (width_range[0] + width_factor * (width_range[1] - width_range[0]))
            
            # Add small random variations
            width += random.gauss(0, 0.1)
            profile.append(max(0.5, width))
        
        return profile
    
    def _generate_opacity_profile(self, length, pen_params):
        """Generate realistic opacity profile for ink flow"""
        
        base_opacity = pen_params.get('opacity', 0.9)
        
        profile = []
        for i in range(length):
            t = i / max(length - 1, 1)
            
            # Slightly less opacity at stroke ends
            opacity = base_opacity * (0.9 + 0.1 * math.sin(t * math.pi))
            
            # Random ink flow variations
            opacity += random.gauss(0, 0.02)
            profile.append(min(1.0, max(0.3, opacity)))
        
        return profile