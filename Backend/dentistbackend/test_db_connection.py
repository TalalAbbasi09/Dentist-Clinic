import pyodbc

try:
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 18 for SQL Server};'
        'SERVER=localhost;'
        'DATABASE=DentistConnectDB;'
        'UID=dentist_user;'
        'PWD=dentist123;'
        'Encrypt=no;'
        'TrustServerCertificate=yes;'
    )
    print("✅ Connection successful!")
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sys.databases;")
    print("✅ Databases on server:")
    for row in cursor.fetchall():
        print(" -", row[0])
    conn.close()

except Exception as e:
    print("❌ Connection failed:")
    print(e)
