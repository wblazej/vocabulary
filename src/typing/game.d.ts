export default interface IGame {
    id: string;
    name: string;
    created_at: number;
    fields: Array<string>;
    words: Array<Array<string>>;
}
