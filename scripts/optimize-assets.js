const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * OPTIMIZE ASSETS SCRIPT
 * 1. Checks for 'sharp' dependency and installs if missing.
 * 2. Scans assets and Mini game folders for PNG/JPG files recursively.
 * 3. Converts them to WebP using sharp.
 * 4. Updates .js, .html, and .css files to point to .webp extensions.
 */

async function main() {
    console.log('🚀 Starting WebP Optimization...');

    // 1. Check for sharp
    try {
        require.resolve('sharp');
    } catch (e) {
        console.log('📦 "sharp" library not found. Installing...');
        try {
            execSync('npm install sharp', { stdio: 'inherit' });
        } catch (err) {
            console.error('❌ Failed to install sharp. Please run "npm install sharp" manually.');
            process.exit(1);
        }
    }

    const sharp = require('sharp');

    const rootDirs = [
        path.join(__dirname, '../assets'),
        path.join(__dirname, '../Mini game/graphics'),
        path.join(__dirname, '../Mini game/graphics/game_screen_elements')
    ];

    const dbFiles = [
        path.join(__dirname, '../js/database.js'),
        path.join(__dirname, '../js/modules/kitchen-db.js'),
        path.join(__dirname, '../js/modules/news.js'),
        path.join(__dirname, '../js/modules/news-db.js'),
        path.join(__dirname, '../index.html'),
        path.join(__dirname, '../Mini game/game_index.html'),
        path.join(__dirname, '../Mini game/game.js'),
        path.join(__dirname, '../Mini game/game_style.css')
    ];

    let convertedCount = 0;

    // Helper for recursive file finding
    function getFilesRecursive(dir, files = []) {
        if (!fs.existsSync(dir)) return files;
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
                getFilesRecursive(fullPath, files);
            } else {
                if (/\.(png|jpg|jpeg)$/i.test(item)) {
                    files.push(fullPath);
                }
            }
        }
        return files;
    }

    // 2. Convert Images
    console.log('🖼️ Scanning for images...');
    const allImages = [];
    for (const root of rootDirs) {
        getFilesRecursive(root, allImages);
    }

    console.log(`🔍 Found ${allImages.length} images. Processing...`);

    for (const inputPath of allImages) {
        const file = path.basename(inputPath);
        const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

        if (fs.existsSync(outputPath)) {
            // console.log(`⏩ Skipping (already exists): ${file}`);
            continue;
        }

        try {
            console.log(`📸 Converting: ${file} -> .webp`);
            await sharp(inputPath)
                .webp({ quality: 85 })
                .toFile(outputPath);
            convertedCount++;
        } catch (err) {
            console.error(`❌ Error converting ${file}:`, err.message);
        }
    }

    console.log(`✅ Conversion complete! ${convertedCount} new images processed.`);

    // 3. Update Reference Files
    console.log('📝 Updating references in code files...');
    let updatedFilesCount = 0;

    for (const file of dbFiles) {
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file, 'utf8');
            const originalContent = content;

            // Replace .png, .jpg, .jpeg with .webp in strings
            // This regex handles extensions followed by a quote or backtick
            content = content.replace(/\.(png|jpg|jpeg)(?=["'`])/gi, '.webp');

            if (content !== originalContent) {
                fs.writeFileSync(file, content, 'utf8');
                console.log(`✨ Updated references in: ${path.basename(file)}`);
                updatedFilesCount++;
            }
        }
    }

    console.log(`🏁 All done! ${updatedFilesCount} files updated.`);
    console.log('\n💡 Tip: You can now remove the old .png and .jpg files if you are happy with the results.');
}

main().catch(err => {
    console.error('💥 An unexpected error occurred:', err);
});
