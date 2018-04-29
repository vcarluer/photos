from flask import Flask, render_template
import glob
app = Flask(__name__)

@app.route("/")
def photos():
    # No recursive for sort
    thumbs = glob.glob("./static/thumbs/phone/*.jpg", recursive=False)
    sortedThumbs = sorted(thumbs, reverse=True)
    return render_template("thumbs.html", thumbs=sortedThumbs)
