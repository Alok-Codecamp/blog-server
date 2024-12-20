import { FilterQuery, Query } from "mongoose";

class FlexibleQueryBuilder<T> {

    public queryModel: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
        this.queryModel = queryModel;
        this.query = query;
    }

    search(searchAbleProperties: string[]) {
        const search = this?.query?.search;
        if (search) {

            this.queryModel = this.queryModel.find({
                $or: searchAbleProperties.map((properties) => ({
                    [properties]: { $regex: search, $options: 'i' }
                }) as FilterQuery<T>)
            })

        }
        return this;
    }

    sort() {

        const sortBy = this?.query?.sortBy || 'createdAt';
        const sortOrder = this?.query?.sortOrder;
        let sortWithOrder;
        if (sortOrder === 'asc') {
            sortWithOrder = sortOrder;
        }
        else if (sortOrder === 'desc') {
            sortWithOrder = `-${sortBy}`
        }
        this.queryModel.sort(sortWithOrder as string);

        return this;
    }

    filter() {
        const filterQuery = this.query.author;

        if (filterQuery) {
            this.queryModel = this.queryModel.find({ author: filterQuery })
        }


        return this;
    }



}



export default FlexibleQueryBuilder;