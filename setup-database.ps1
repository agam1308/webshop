# PowerShell script to initialize MySQL database
$mysqlPaths = @(
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe",
    "C:\xampp\mysql\bin\mysql.exe",
    "C:\wamp64\bin\mysql\mysql8.0.27\bin\mysql.exe"
)

$mysqlPath = $null
foreach ($path in $mysqlPaths) {
    if (Test-Path $path) {
        $mysqlPath = $path
        break
    }
}

if ($mysqlPath) {
    Write-Host "Found MySQL at: $mysqlPath" -ForegroundColor Green
    Write-Host "Initializing database..." -ForegroundColor Yellow
    
    $sqlContent = Get-Content -Path "init-db.sql" -Raw
    $sqlContent | & $mysqlPath -u root -proot 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nDatabase initialized successfully!" -ForegroundColor Green
        Write-Host "You can now access the application at http://localhost:3000" -ForegroundColor Cyan
    } else {
        Write-Host "`nError initializing database. Please run init-db.sql manually in MySQL Workbench." -ForegroundColor Red
    }
} else {
    Write-Host "MySQL not found in common installation paths." -ForegroundColor Red
    Write-Host "Please initialize the database manually:" -ForegroundColor Yellow
    Write-Host "1. Open MySQL Workbench" -ForegroundColor White
    Write-Host "2. Connect to localhost:3306" -ForegroundColor White
    Write-Host "3. Open init-db.sql file" -ForegroundColor White
    Write-Host "4. Execute the entire script" -ForegroundColor White
}
