from flask import Flask, jsonify, request, session
from flask_cors import CORS
import psycopg2

app = Flask(__name__)

app.secret_key = 'your_secret_key'

CORS(app)

connection = psycopg2.connect(
    database="data_retrieval",
    user="postgres",
    password="postgres",
    host="127.0.0.1",
    port="5432"
)

@app.route('/api/login', methods=['POST'])
def login():
    try:
        # Menerima data JSON dan menampilkan data yang diterima untuk debugging
        data = request.get_json()
        print(f"Request received: {data}")  # Menambahkan print untuk menampilkan data yang diterima

        nik = data.get("nik")
        password = data.get("password")

        print(f"Searching for NIK: {nik}")  # Menampilkan NIK yang sedang dicari

        cursor = connection.cursor()
        # Menambahkan schema public. di query
        cursor.execute('SELECT id, nik, password, role FROM public."akun_pegawai" WHERE nik = %s', (nik,))
        result = cursor.fetchone()
        print(f"Query result: {result}")  # Menampilkan hasil query untuk debugging

        if result:
            user_id, stored_nik, stored_password, role = result

            print(f"Stored password: {stored_password}")  # Menampilkan password yang disimpan di database
            print(f"Input password: {password}")  # Menampilkan password yang dimasukkan oleh pengguna

            if stored_password == password:
                session['user_id'] = user_id
                session['nik'] = stored_nik
                session['role'] = role

                print(f"Password matches, role: {role}")  # Menampilkan bahwa password cocok dan role pengguna

                # Tentukan redirect berdasarkan role
                if role == "admin":
                    redirect_url = "/dashboardadmin"
                elif role == "pegawai":
                    redirect_url = "/dashboarduser"
                else:
                    return jsonify({"status": "error", "message": "Role not recognized"}), 403

                return jsonify({
                    "status": "success",
                    "message": "Login successful",
                    "redirect": redirect_url,
                    "profile": {
                        "user_id": user_id,
                        "nik": stored_nik,
                        "role": role
                    }
                })
            else:
                print("Invalid password")  # Menampilkan pesan jika password tidak cocok
                return jsonify({"status": "error", "message": "Invalid password"}), 401
        else:
            print("User not found")  # Menampilkan pesan jika pengguna tidak ditemukan
            return jsonify({"status": "error", "message": "User not found"}), 404

    except Exception as e:
        print(f"Error during login: {str(e)}")  # Menampilkan error jika terjadi kesalahan
        return jsonify({
            "status": "error",
            "message": "Internal server error",
            "error_details": str(e)
        }), 500

@app.route('/')
def index():
    return jsonify({
        "message": "Aplikasi berjalan dengan baik!"
    })

if __name__ == '__main__':
    app.run(debug=True)
