const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "output", "messy-files");
// console.log(fs.readdirSync(sourceDir));
// console.log(fs.statSync(sourceDir));


const organizedDir = path.join(__dirname, "output", "organized");
console.log('Source Dir: ', sourceDir);
// console.log('Dir name: ',__dirname);


const categories = {
      images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
      documents: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
      videos: [".mp4", ".avi", ".mkv", ".mov", ".wmv"],
      audio: [".mp3", ".wav", ".flac", ".aac", ".ogg"],
      code: [".js", ".py", ".java", ".cpp", ".html", ".css"],
      archives: [".zip", ".rar", ".tar", ".gz", ".7z"],
      spreadsheets: [".xls", ".xlsx", ".csv"],
      others: [],
};
const testFiles = [
      "vacation.jpg",
      "report.pdf",
      "presentation.pptx",
      "music.mp3",
      "video.mp4",
      "script.js",
      "data.csv",
      "archive.zip",
      "photo.png",
      "notes.txt",
      "app.py",
      "movie.avi",
      "song.wav",
      "backup.tar.gz",
      "random.xyz",
      "nodejs.zip",
];

function initializeDirectories() {
      if (!fs.existsSync(sourceDir)) {
            fs.mkdirSync(sourceDir, { recursive: true })

            testFiles?.forEach(file => {
                  fs.writeFileSync(path.join(sourceDir, file), `This is the file of ${file}`)
            })
      }

      // console.log('File has been created!!');

      if (!fs.existsSync(organizedDir)) {
            fs.mkdirSync(organizedDir, { recursive: true })
      }

      Object.keys(categories).forEach(category => {
            if (!fs.existsSync(path.join(organizedDir, category))) {
                  fs.mkdirSync(path.join(organizedDir, category))
            }
      })
}



function getCategories(filename) {
      const fileExt = path.extname(filename).toLowerCase();

      for (const [category, extensions] of Object.entries(categories)) {
            console.log(category, extensions);
            if (extensions.includes(fileExt)) {
                  return category
            }
      }
      return 'others'
}


function organizeFile() {
      const files = fs.readdirSync(sourceDir);
      if (files.length === 0) {
            return console.log('File not found');
      }

      console.log(`Files has ${files.length} to organize`);

      const stats = {
            total: 0,
            byCategory: {}
      }

      files.forEach(file => {
            const sourcePath = path.join(sourceDir, file);
            const stat = fs.statSync(sourcePath);
            if (stat.isDirectory()) {
                  return;
            }
            const category = getCategories(file);
            const destDir = path.join(organizedDir, category);
            const destPath = path.join(destDir, file);

            fs.copyFileSync(sourcePath, destPath)
            stats.total++;
            stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

            console.log(file);
            console.log(stat);
            console.log(category);

      })

}

function showHelp() {
      console.log(`
            file organize - usage

            commands:
            init - cerate file
            organize - organize file into categories

            example:
            node file-organizer init
            node file-organizer organize
            `);

}

const command = process.argv[2];

switch (command) {
      case "init":
            initializeDirectories()
            break;
      case "organize":
            organizeFile()
            break;
      default:
            showHelp()
            break;
}

