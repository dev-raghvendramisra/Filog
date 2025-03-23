class Query {
    constructor() {
        this.query = {
            filters: {},
            sort: {},
            limit: 0,
            skip: 0
        };
    }

    $ne(key, value) {
        this.query.filters[key] = { $ne: value };
        return this;
    }

    $eq(key, value) {
        this.query.filters[key] = { $eq: value };
        return this;
    }

    $gt(key, value) {
        this.query.filters[key] = { $gt: value };
        return this;
    }

    $gte(key, value) {
        this.query.filters[key] = { $gte: value };
        return this;
    }

    $lt(key, value) {
        this.query.filters[key] = { $lt: value };
        return this;
    }

    $lte(key, value) {
        this.query.filters[key] = { $lte: value };
        return this;
    }

    $in(key, value) {
        if (!Array.isArray(value)) throw new Error("$in expects an array");
        this.query.filters[key] = { $in: value };
        return this;
    }

    $nin(key, value) {
        if (!Array.isArray(value)) throw new Error("$nin expects an array");
        this.query.filters[key] = { $nin: value };
        return this;
    }

    $all(key, value) {
        if (!Array.isArray(value)) throw new Error("$all expects an array");
        this.query.filters[key] = { $all: value };
        return this;
    }

    $sortAsc(key) {
        this.query.sort[key] = 1;
        return this;
    }

    $sortDesc(key) {
        this.query.sort[key] = -1;
        return this;
    }

    $limit(value) {
        if (typeof value !== "number" || value < 0) throw new Error("$limit expects a positive number");
        this.query.limit = value;
        return this;
    }

    $skip(value) {
        if (typeof value !== "number" || value < 0) throw new Error("$skip expects a positive number");
        this.query.skip = value;
        return this;
    }

    static $or(query, ...keys) {
        const finalFilter = { $or: [] };
        const remainingFilters = {};

        Object.keys(query.filters).forEach((key) => {
            if (keys.includes(key)) {
                finalFilter.$or.push({ [key]: query.filters[key] });
            } else {
                remainingFilters[key] = query.filters[key];
            }
        });

        return {
            filters: { ...remainingFilters, ...(finalFilter.$or.length > 0 ? finalFilter : {}) },
            sort: query.sort,
            limit: query.limit,
            skip: query.skip
        };
    }

    static $and(...queries) {
        console.log("QUERIES",queries)
        if (queries.length < 2) throw new Error("$and requires at least two Query instances");

        const filters = queries.map(q => q.query.filters);
        const mergedQ = new Query()
        mergedQ.query.filters = { $and: filters };
        mergedQ.query.sort = queries[0].query.sort;
        mergedQ.query.limit = queries[0].query.limit;
        mergedQ.query.skip = queries[0].query.skip;
        return mergedQ;
    }

    build() {
        return encodeURIComponent(JSON.stringify(this.query));
    }
}



export default Query;
