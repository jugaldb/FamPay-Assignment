alter table videos
add column search_doc_idx tsvector;
update videos
set search_doc_idx = to_tsvector(name || ' ' || coalesce(description, ''));
create index search_idx on videos using GIN(search_doc_idx);