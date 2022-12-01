## Notes

This is a Tier List of Jackbox Games using Vue + Drag and Drop API. There are other librarys such as SortableJS or VueDraggable that would made things a little easier, but this is a fun learning experience 🙂

NodeJs v16 is a requirement for launching this project.

To launch the project:
1. npm run instal
2. npm run dev
3. go to http://localhost:5173/

It is recommended to set the viewing port width to at least 1020px for the best viewing experience. 

## Scrape Game Titles

Created a web scraping script to pull all the party pack games into a json format to simulate a response from the backend. 
Run `npm run scrape` to get the all the games currently available. 