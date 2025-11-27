#!/usr/bin/env python3
"""
College Event Manager - Installation Verification Script
Run this to verify all files are in place
"""

import os
import json
from pathlib import Path

def verify_project():
    """Verify project structure and files"""
    
    base_path = Path("c:/Users/nirmit/Desktop/MSC 2/college-event-manager")
    
    checks = {
        "Root Documentation": [
            "README.md",
            "QUICK_START.md",
            "INSTALLATION.md",
            "ARCHITECTURE.md",
            "CODE_QUALITY.md",
            "FEATURES.md",
            "PROJECT_SUMMARY.md",
            "COMPLETION_CHECKLIST.md",
            "FILE_INDEX.md",
            "START_HERE.md",
            "DELIVERY_SUMMARY.md",
        ],
        "Backend": [
            "backend/server.js",
            "backend/seed.js",
            "backend/package.json",
            "backend/.env",
            "backend/models/User.js",
            "backend/models/Event.js",
            "backend/models/Registration.js",
            "backend/routes/auth.js",
            "backend/routes/events.js",
            "backend/routes/registrations.js",
            "backend/middleware/auth.js",
        ],
        "Frontend": [
            "frontend/index.html",
            "frontend/package.json",
            "frontend/vite.config.js",
            "frontend/tailwind.config.js",
            "frontend/postcss.config.js",
            "frontend/src/App.jsx",
            "frontend/src/main.jsx",
            "frontend/src/index.css",
            "frontend/src/api.js",
            "frontend/src/AuthContext.js",
            "frontend/src/components/Button.jsx",
            "frontend/src/components/Card.jsx",
            "frontend/src/components/Header.jsx",
            "frontend/src/hooks/useAnimation.js",
            "frontend/src/pages/LoginSignup.jsx",
            "frontend/src/pages/EventsList.jsx",
            "frontend/src/pages/EventDetails.jsx",
            "frontend/src/pages/StudentDashboard.jsx",
            "frontend/src/pages/AdminDashboard.jsx",
            "frontend/src/pages/CreateEvent.jsx",
            "frontend/src/pages/EditEvent.jsx",
        ],
        "Setup Scripts": [
            "setup.bat",
            "setup.sh",
        ],
    }
    
    print("\n" + "="*70)
    print("  COLLEGE EVENT MANAGER - PROJECT VERIFICATION")
    print("="*70 + "\n")
    
    total_found = 0
    total_expected = 0
    
    for category, files in checks.items():
        print(f"\n📁 {category}")
        print("-" * 70)
        
        found = 0
        for file in files:
            total_expected += 1
            file_path = base_path / file
            if file_path.exists():
                print(f"  ✅ {file}")
                found += 1
                total_found += 1
            else:
                print(f"  ❌ {file} (MISSING)")
        
        print(f"  → {found}/{len(files)} files present")
    
    print("\n" + "="*70)
    print(f"TOTAL: {total_found}/{total_expected} files present")
    print("="*70)
    
    if total_found == total_expected:
        print("\n🎉 PROJECT COMPLETE - ALL FILES PRESENT! 🎉\n")
        return True
    else:
        print(f"\n⚠️  {total_expected - total_found} file(s) missing\n")
        return False

if __name__ == "__main__":
    verify_project()
