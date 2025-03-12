module.exports = (objectPageination, query, countRecords) => {
    if(query.page){
        objectPageination.currentPage = parseInt(query.page);
    }

    if(query.limit){
        objectPageination.limitItem = parseInt(query.limit);
    }

    objectPageination.skip = (objectPageination.currentPage - 1) * objectPageination.limitItem;
    
    const totalPage = Math.ceil(countRecords / objectPageination.limitItem);
    objectPageination.totalPage = totalPage;

    return objectPageination;
}