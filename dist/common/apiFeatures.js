"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFeatures = void 0;
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
        void this.filter();
        void this.sort();
        void this.limitFields();
        void this.pagination();
    }
    // TypeOf<typeof createStoreSchema>
    async filter() {
        const queryObj = Object.assign({}, this.queryString);
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => {
            const _a = queryObj, _b = el, removeEl = _a[_b], other = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return other;
        });
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        await this.query.find(JSON.parse(queryStr));
        return this;
    }
    async sort() {
        if (this.queryString.sort.length > 0) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            await this.query.find().sort(sortBy);
        }
        await this.query.find().sort('-createdAt');
        return this;
    }
    async limitFields() {
        if (this.queryString.fields.length > 0) {
            const fields = this.queryString.fields.split(',').join(' ');
            await this.query.find().select(fields);
        }
        await this.query.find().select('-__v');
        return this;
    }
    async pagination() {
        var _a, _b;
        const page = (_a = Number(this.queryString.page) * 1) !== null && _a !== void 0 ? _a : 1;
        const limit = (_b = Number(this.queryString.limit) * 1) !== null && _b !== void 0 ? _b : 10;
        const skip = (page - 1) * limit;
        await this.query.find().skip(skip).limit(limit);
        return this;
    }
}
exports.APIFeatures = APIFeatures;
//# sourceMappingURL=apiFeatures.js.map