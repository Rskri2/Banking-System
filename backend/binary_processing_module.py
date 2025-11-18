def convertToBinaryData(filename):
    with open(filename, 'rb') as file:
        blobData = file.read()
    return blobData

def write_file(blob_data, filename):
    with open(filename, 'wb') as file:
        file.write(blob_data)
    return filename
