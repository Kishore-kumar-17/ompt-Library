import fs from "fs";
import path from "path";

const previewDir = "frontend/public/previews";
const folders = fs.readdirSync(previewDir);

console.log("================================================================");
console.log(`   AUDITING ALL ${folders.length} WEBSITE PREVIEW PACKAGES IN FRONTEND/PUBLIC`);
console.log("================================================================\n");

let totalWebsites = 0;
let passedWebsites = 0;
let failedWebsites = 0;
let totalPagesFound = 0;
let totalSectionsFound = 0;

folders.forEach((folder, idx) => {
  const folderPath = path.join(previewDir, folder);
  const stat = fs.statSync(folderPath);

  if (stat.isDirectory()) {
    totalWebsites++;
    const files = fs.readdirSync(folderPath);
    const htmlFiles = files.filter(f => f.endsWith(".html"));

    const indexPath = path.join(folderPath, "index.html");
    const hasIndex = fs.existsSync(indexPath);

    let indexContent = "";
    let internalLinks = [];
    let sectionAnchors = [];

    if (hasIndex) {
      indexContent = fs.readFileSync(indexPath, "utf8");

      // Find internal html page links
      const pageMatches = indexContent.match(/href=["']([^"']+\.html)["']/gi) || [];
      internalLinks = pageMatches.map(m => m.replace(/href=["']/i, "").replace(/["']$/, ""));

      // Find section anchors
      const sectionMatches = indexContent.match(/id=["']([^"']+)["']/gi) || [];
      sectionAnchors = sectionMatches.map(m => m.replace(/id=["']/i, "").replace(/["']$/, ""));
    }

    totalPagesFound += htmlFiles.length;
    totalSectionsFound += sectionAnchors.length;

    // Check if internal linked html files exist
    const missingPages = [];
    internalLinks.forEach(link => {
      const cleanLink = link.split("?")[0].split("#")[0];
      if (cleanLink && !cleanLink.startsWith("http") && !cleanLink.startsWith("//")) {
        const targetPath = path.join(folderPath, cleanLink);
        if (!fs.existsSync(targetPath)) {
          missingPages.push(cleanLink);
        }
      }
    });

    const isOk = hasIndex && missingPages.length === 0;

    if (isOk) {
      passedWebsites++;
    } else {
      failedWebsites++;
    }

    if (idx < 15 || !isOk) {
      console.log(`[${idx + 1}/91] ${folder}:`);
      console.log(`  -> Has index.html: ${hasIndex ? "YES" : "NO"}`);
      console.log(`  -> Total HTML Pages: ${htmlFiles.length} (${htmlFiles.join(", ")})`);
      console.log(`  -> Internal Section IDs: ${sectionAnchors.length} (${sectionAnchors.slice(0, 5).join(", ")}...)`);
      if (missingPages.length > 0) {
        console.log(`  -> [WARNING] Missing Linked Pages: ${missingPages.join(", ")}`);
      }
      console.log(`  -> Status: ${isOk ? "OK" : "FAILED"}\n`);
    }
  }
});

console.log("================================================================");
console.log(`TOTAL WEBSITES AUDITED: ${totalWebsites}`);
console.log(`PASSED WEBSITES: ${passedWebsites} / ${totalWebsites}`);
console.log(`FAILED WEBSITES: ${failedWebsites}`);
console.log(`TOTAL HTML PAGES AUDITED: ${totalPagesFound}`);
console.log(`TOTAL INTERNAL SECTIONS/ANCHORS: ${totalSectionsFound}`);
console.log("================================================================");
