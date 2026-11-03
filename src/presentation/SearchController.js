export class SearchController {
    constructor(searchUseCase) {
        this.searchUseCase = searchUseCase;
    }

    async handle(req, res) {
        try {
            const query = req.query.q;
            if(!query) return res.status(400).json({ error: "The parameter 'q' is mandatory." });
            const results = await this.searchUseCase.execute(query);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}