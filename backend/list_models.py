"""
List all available Gemini models for your API key
"""
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

print("🔍 Fetching available Gemini models...\n")

try:
    # List all models
    models = genai.list_models()
    
    print("Available models that support generateContent:")
    print("=" * 60)
    
    for model in models:
        # Only show models that support content generation
        if 'generateContent' in model.supported_generation_methods:
            print(f"\n✅ {model.name}")
            print(f"   Description: {model.description}")
            print(f"   Input token limit: {model.input_token_limit}")
            print(f"   Output token limit: {model.output_token_limit}")
    
    print("\n" + "=" * 60)
    print("\n💡 Pick one of these model names for BroCode!")
    
except Exception as e:
    print(f"❌ ERROR: {str(e)}")