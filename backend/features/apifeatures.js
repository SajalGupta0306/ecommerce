class Apifeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // implement search functionality to search any product
  search() {
    // searching product based on its name
    const searchValue = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, // setting regex for the particular value which needs to be searched
            $options: "i", // this indicates that the search is case-insensitive
          },
        }
      : {};
    // forming the same query to find the specific product name
    this.query = this.query.find({ ...searchValue });
    // returning the entire class object
    return this;
  }

  // implement filter functionality to filter out items based on category: category, price and ratings
  filter() {
    // spread operator to pass the value of object instead of reference
    const queryStrCopy = { ...this.queryStr };
    // query params which needs to be avoided for filter as they are part of search criteira
    const fieldsToRemove = ["keyword", "page", "limit"];
    fieldsToRemove.forEach((field) => delete queryStrCopy[field]);

    // filter for price and ratings for defining a range
    let stringifiedQueryStr = JSON.stringify(queryStrCopy);
    // replacing the params: lt as $lt etc
    stringifiedQueryStr = stringifiedQueryStr.replace(/\b(lt|lte|gt|gte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(stringifiedQueryStr));
    return this;
  }

  pagination(recordsPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
      const recordsToSkip = recordsPerPage * (currentPage - 1);
      // limit is used to find limited records based on the number provided
      this. query = this.query.limit(recordsPerPage).skip(recordsToSkip);
      return this;
  }
}

module.exports = Apifeatures;
