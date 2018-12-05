from flask import Flask, render_template, jsonify
import glob

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("photos.html");

@app.route("/photos")
def photos():
    # No recursive for sort
    thumbs = glob.glob("./static/thumbs/phone/*.jpg", recursive=False)
    sortedThumbs = sorted(thumbs, reverse=True)
    # return render_template("thumbs.html", thumbs=sortedThumbs)
    return jsonify(sortedThumbs);
