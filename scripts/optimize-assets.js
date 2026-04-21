const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * OPTIMIZE ASSETS SCRIPT
 * 1. Checks for 'sharp' dependency and installs if missing.
 * 2. Scans assets folders for PNG/JPG files.
 * 3. Converts them to WebP using sharp.
 * 4. Updates .js database files to point to .webp extensions.
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

    const targetDirs = [
        path.join(__dirname, '../assets'),
        path.join(__dirname, '../assets/Cocktails'),
        path.join(__dirname, '../assets/Fridge'),
        path.join(__dirname, '../assets/logo'),
        path.join(__dirname, '../assets/Kitchen')
    ];

    const dbFiles = [
        path.join(__dirname, '../js/modules/database.js'),
        path.join(__dirname, '../js/modules/mocktails.js'),
        path.join(__dirname, '../js/modules/kitchen-db.js'),
        path.join(__dirname, '../index.html')
    ];

    let convertedCount = 0;

    // 2. Convert Images
    for (const dir of targetDirs) {
        if (!fs.existsSync(dir)) {
            console.warn(`⚠️ Directory not found: ${dir}`);
            continue;
        }

        const files = fs.readdirSync(dir);
        for (const file of files) {
            if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
                const inputPath = path.join(dir, file);
                const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

                if (fs.existsSync(outputPath)) {
                    console.log(`⏩ Skipping (already exists): ${file}`);
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
        }
    }

    console.log(`✅ Conversion complete! ${convertedCount} images processed.`);

    // 3. Update Database Files
    console.log('📝 Updating database references...');
    let updatedFilesCount = 0;

    for (const file of dbFiles) {
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file, 'utf8');
            const originalContent = content;

            // Replace .png, .jpg, .jpeg with .webp in strings
            // We look for patterns like "/path/to/image.png" or "./assets/img.jpg"
            content = content.replace(/\.(png|jpg|jpeg)(?=["'])/gi, '.webp');

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
