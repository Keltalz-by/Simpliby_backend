// type QueryObj = Record<string, string>

// interface Query {
//     find: (val: object) => void;
//     sort: (val: string) => void;
// }

// export class APIFeatures {
//     public query: Query;
//     public queryString: QueryObj;

//     constructor (query: core.Query, queryString: QueryObj) {
//         this.query = query;
//         this.queryString = queryString;

//         this.filter()
//         this.sort()
//     }

//     public filter() {
//         const queryObj = { ...this.queryString }
//         const excludedFields = ["page", "sort", "limit", "fields"]

//         excludedFields.forEach((el) => {
//             const { [el]: removeEl, ...other } = queryObj
//             return other
//         })

//         let queryStr = JSON.stringify(queryObj)
//         queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `${match}`)

//         Object.keys(this.query)
//         this.query.find(JSON.parse(queryStr))

//         return this;
//     }

//     public sort() {
//         if (this.queryString.sort.length > 0) {
//             const sortBy = this.queryString.sort.split(",").join(" ");
//             this.query = this.query.sort(sortBy);
//         }
//     }

// }
