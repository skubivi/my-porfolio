import { resolve as _resolve } from 'path';

const paths = {
    src: _resolve(__dirname, 'src'),
    dist: _resolve(__dirname, 'dist')
};

export const context = paths.src;
export const entry = {
    app: './src/index' // точка входа в приложение, наш src/index.ts файл, названием итогового бандла будет имя свойства - app
};
export const output = {
    path: paths.dist,
    filename: '[name].bundle.js' // название итогового бандла, получится dist/app.bundle.js
};
export const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx'] // указание расширений файлов, которые webpack будет обрабатывать, и пытаться добавить автоматически (например получив запрос на index, не найдет его и попробует index.ts)
};
export const devtool = 'inline-source-map';
export const module = {
    rules: [
        {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        } // загрузчик для обработки файлов с расширением .ts
    ]
};