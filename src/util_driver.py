import steg_core as core

if __name__ == '__main__':
    print('*** String-Binary conversion testing ***\n')
    test = 'This is a conversion test! With @ 123--987.0'
    test_bin = core.str2binary(test)
    test_conv = core.binary2str(test_bin)

    print(f'Test string is {test}')
    print(f'In binary, that is {test_bin}')
    print(f'And converted back into Unicode: {test_conv}')

    print('\n*** Image Pixel Extraction testing ***\n')

    data = core.loadImage('./assets/images/pixel_test.png')
    print(f"Image is {data['width']} pixels wide "
          f"and {data['height']} pixels high")
    print('Pixel data:')
    for x in range(data['width']):
        for y in range(data['height']):
            print(data['pixels'][x, y])
