from flask import Flask


app = Flask(__name__)

# @app.route('/')
# def hello_world():
#    return 'Hello World!!!，还是热更新的66666'


@app.route('/')
def hello_html():
      return """
      <html>
         <h1>Hello World</h1>
         <h2>Hello World</h2>
         <h3>Hello World</h3>
         <h4>Hello World</h4>
         <b>88888</b>
      </html>
      """
            
app.run(port = 8020, debug = True)