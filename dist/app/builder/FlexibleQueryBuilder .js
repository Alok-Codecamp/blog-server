"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlexibleQueryBuilder {
    constructor(queryModel, query) {
        this.queryModel = queryModel;
        this.query = query;
    }
    search(searchAbleProperties) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            this.queryModel = this.queryModel.find({
                $or: searchAbleProperties.map((properties) => ({
                    [properties]: { $regex: search, $options: 'i' }
                }))
            });
        }
        return this;
    }
    sort() {
        var _a, _b;
        const sortBy = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || 'createdAt';
        const sortOrder = (_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder;
        let sortWithOrder;
        if (sortOrder === 'asc') {
            sortWithOrder = sortOrder;
        }
        else if (sortOrder === 'desc') {
            sortWithOrder = `-${sortBy}`;
        }
        this.queryModel.sort(sortWithOrder);
        return this;
    }
    filter() {
        const filterQuery = this.query.author;
        if (filterQuery) {
            this.queryModel = this.queryModel.find({ author: filterQuery });
        }
        return this;
    }
}
exports.default = FlexibleQueryBuilder;
