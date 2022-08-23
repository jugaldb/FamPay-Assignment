alter table videos
add column search_doc_weights tsvector;
update videos
set search_doc_weights = setweight(to_tsvector(name), 'A') || setweight(to_tsvector(coalesce(description, '')), 'B');
create index search__weights_idx on videos using GIN(search_doc_weights);