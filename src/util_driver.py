import core_util as core

if __name__ == '__main__':
    test = 'This is a conversion test! With @ 123--987.0'
    test_bin = core.str2binary(test)
    print('Binary: ' + test_bin)
    print('Str: ' + core.binary2str(test_bin))
