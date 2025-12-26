"""
Test script to verify Gemini API connection works
This helps us understand the API before building the full app
"""
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Get API key from environment
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ ERROR: GEMINI_API_KEY not found in .env file")
    print("Make sure your .env file has: GEMINI_API_KEY=your_key_here")
    exit(1)

print("✅ API key found!")
print(f"Key starts with: {api_key[:10]}...")

# Configure Gemini
genai.configure(api_key=api_key)

# Use Gemini 2.5 Flash (stable, fast, 1M tokens)
model = genai.GenerativeModel('gemini-2.5-flash')

print("\n🤖 Testing Gemini API connection...")

# Sample JavaScript code to review
test_code = """
function addNumbers(a, b) {
    return a + b;
}

const result = addNumbers(5, "10");
console.log(result);
"""

# Simple prompt
prompt = f"""
You are a code reviewer. Review this JavaScript code and find any issues:

{test_code}

List any bugs or problems you find.
"""

try:
    print("\n📤 Sending request to Gemini...")
    
    # Send request
    response = model.generate_content(prompt)
    
    print("\n✅ SUCCESS! Got response from Gemini:")
    print("=" * 50)
    print(response.text)
    print("=" * 50)
    
    print("\n🎉 API connection works! We're ready to build CodeBro.")
    
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")
    print("Check your API key and internet connection")