/* Avaialble Source languages */
export const sourceLanguages = [
    'C++',
    'JAVA', 
    'Python3'
]

/* Available target languages */
export const targetLanguages = [
    'C++',
    'JAVA',
    'Python3'
]

/* Sample JAVA code */
export const sampleJAVACode = `
    public static int max(int a, int b) { 
        return a > b ? a : b;
    }
    public static void createDirectory(Path path)
           throws IOException {
               if(!Files.exists(path)) {
                   Files.createDirectories(path);
                }
            }
`

/* Sample Python code */
export const samplePythonCode = `
    def max(a, b):
        return a if a > b else b

    def create_directory(path):
        if not os.path.exists(path):os.makedirs(path)
`