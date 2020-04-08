def str2binary(string):
    """Returns the binary string of the input string"""
    return ''.join(format(ord(i), 'b').zfill(8) for i in string)

def binary2str(binary):
    """Returns the string representatin of the binary data"""
    str_data = ''
    for i in range(0, len(binary), 8):
        str_data += chr(int(binary[i:i+8], 2))
    return str_data
