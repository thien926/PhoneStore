using System;
using System.Collections.Generic;

namespace Infrastructure
{
    public class PaginatedList<T> : List<T>
    {
        public PaginatedList(IEnumerable<T> items, int count, int pageIndex, int pageSize)
        {
            this.AddRange(items);
            PageIndex = pageIndex;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            if(PageIndex > TotalPages){
                PageIndex = TotalPages;
            }
            if(PageIndex < 1){
                PageIndex = 1;
            }
        }

        public int PageIndex { get; }
        public int TotalPages { get; }

        public bool HasPreviousPage { get => PageIndex > 1; }
        public bool HasNextPage { get => PageIndex < TotalPages; }
    }
}