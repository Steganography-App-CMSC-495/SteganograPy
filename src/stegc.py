import steg_core as core
import sys
from os import path


def main():
    # Usage: python stegc.py encrypt|decrypt <input filename>
    #  [-s <secret>|-out <filename>|-diff <filename>]
    if '-help' in sys.argv:
        sys.argv.remove('-help')
        printUsage()

    diffFilename = grabFlags(['-diff', '-d', '-difference'])
    outputFile = grabFlags(['-out', '-o'])
    message = grabFlags(['-s', '-secret'])

    argLength = len(sys.argv)
    if argLength < 3:
        printUsage()
        return
    mode = sys.argv[1]
    inputFile = sys.argv[2]

    if not path.exists(inputFile):
        print('Input file does not exist. Please verify the file path.')
        return
    if not path.isfile(inputFile):
        print('Input file is a directory, must be a file.')
        return

    print('Loading input image...', end='')
    data = core.getImageData(inputFile)
    print('Done')

    if mode == 'encrypt':
        # if no message passed in, ask for secret
        while message is None or len(message) == 0:
            message = input('Enter your secret (file or text)'
                            ' to encrypt: ')

        if path.exists(message):
            print(f'Loading secret file {message}...', end='')
            with open(message, 'r') as sec_file:
                message = sec_file.read()
            print('Done')

        # creates output file path if one wasn't given
        if outputFile is None:
            if '/' in inputFile:
                slashIndex = inputFile.rfind('/')
                outputFile = inputFile[:slashIndex+1] \
                    + "enc_" + inputFile[slashIndex+1:]
            else:
                outputFile = f'enc_{inputFile}'

        print('Performing encryption...', end='')
        try:
            enc_data = core.evenOddEncryption(data, message)
        except RuntimeError:
            print('\n** ERROR: The secret is too long and cannot be encrypted '
                  'into the image.')
            return
        print('Done')
        print('Saving encrypted image...', end='')
        core.saveImage(enc_data, outputFile)
        print('Done')

        print(f'Encrypted image saved at {outputFile}')

        if diffFilename is not None:
            print('Generating difference image...', end='')
            core.saveImage(core.getDifferenceData(data, enc_data, 150),
                           diffFilename)
            print('Done')
            print(f'Difference image saved at {diffFilename}')
    elif mode == 'decrypt':
        if outputFile is not None:
            # save message to file\
            print('Decrypting and saving message...', end='')
            with open(outputFile, 'w') as output:
                output.write(core.evenOddDecryption(data))
            print('Done')
            print(f'Decrypted text saved to {outputFile}')
        else:
            print('Decrypting...', end='')
            print('Done\n' + core.evenOddDecryption(data))
    else:
        print('Unrecognized mode, only encrypt and decrypt are supported')


def grabFlag(flagname):
    """ Extracts a flag's value out of the sys.argv list """
    if flagname in sys.argv:
        # get flag arg
        index = sys.argv.index(flagname)
        if (index + 1 < len(sys.argv)):  # not end of args
            arg = sys.argv[index+1]
            sys.argv.remove(flagname)
            return sys.argv.pop(index)  # removes that flag arg
    return None


def grabFlags(flagnames):
    """ Grabs the first valid flag in list of possible flags """
    for flag in flagnames:
        val = grabFlag(flag)
        if val is not None:
            return val


def printUsage():
    print('Usage: python stegc.py encrypt|decrypt <input filename>'
          ' [-s <secret|filename>|-out <filename>|-diff <filename>|-help]')


if __name__ == '__main__':
    main()
