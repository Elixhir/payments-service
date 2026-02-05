import random
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/process", methods=["POST"])
def process_payment():
    data = request.get_json()

    if not data or "amount" not in data:
        return jsonify({"error": "Amount is required"}), 400

    amount = data["amount"]

    try:
        amount = float(amount)
    except ValueError:
        return jsonify({"error": "Invalid amount"}), 400

    approved = random.random() < 0.8

    return jsonify({
        "status": "approved" if approved else "rejected"
    })
    

if __name__ == "__main__":
    app.run(port=5000, debug=True)
