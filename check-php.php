<?php
/**
 * PHP Configuration Checker for SecurHUB
 * Access via: yourdomain.com/check-php.php
 * DELETE THIS FILE AFTER CHECKING!
 */

// Security check - only allow on localhost or with parameter
if ($_SERVER['SERVER_NAME'] !== 'localhost' && !isset($_GET['allow_check'])) {
    die('Access denied. Add ?allow_check=1 to URL if needed.');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Configuration Check - SecurHUB</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .section { margin-bottom: 30px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 6px; }
        .check-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
        .check-item:last-child { border-bottom: none; }
        .status-ok { color: #10b981; font-weight: bold; }
        .status-warning { color: #f59e0b; font-weight: bold; }
        .status-error { color: #ef4444; font-weight: bold; }
        .info { background: #dbeafe; padding: 15px; border-radius: 4px; margin: 15px 0; }
        .warning { background: #fef3c7; padding: 15px; border-radius: 4px; margin: 15px 0; color: #92400e; }
        .error { background: #fee2e2; padding: 15px; border-radius: 4px; margin: 15px 0; color: #991b1b; }
        h1 { color: #1f2937; }
        h2 { color: #374151; margin-top: 0; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 3px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>PHP Configuration Check - SecurHUB</h1>
        
        <div class="warning">
            <strong>⚠️ Security Notice:</strong> Delete this file after checking your configuration!
        </div>

        <div class="section">
            <h2>🔧 Basic PHP Information</h2>
            
            <div class="check-item">
                <span>PHP Version:</span>
                <span class="<?php echo version_compare(PHP_VERSION, '7.4.0', '>=') ? 'status-ok' : 'status-error'; ?>">
                    <?php echo PHP_VERSION; ?>
                    <?php if (version_compare(PHP_VERSION, '7.4.0', '<')): ?>
                        (Upgrade recommended)
                    <?php endif; ?>
                </span>
            </div>
            
            <div class="check-item">
                <span>Server Software:</span>
                <span><?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'; ?></span>
            </div>
            
            <div class="check-item">
                <span>Document Root:</span>
                <span><code><?php echo $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown'; ?></code></span>
            </div>
            
            <div class="check-item">
                <span>Server Name:</span>
                <span><?php echo $_SERVER['SERVER_NAME'] ?? 'Unknown'; ?></span>
            </div>
        </div>

        <div class="section">
            <h2>📧 Email Functions</h2>
            
            <div class="check-item">
                <span>mail() Function:</span>
                <span class="<?php echo function_exists('mail') ? 'status-ok' : 'status-error'; ?>">
                    <?php echo function_exists('mail') ? 'Available ✓' : 'Not Available ✗'; ?>
                </span>
            </div>
            
            <div class="check-item">
                <span>Sendmail Path:</span>
                <span><?php echo ini_get('sendmail_path') ?: 'Not set'; ?></span>
            </div>
            
            <div class="check-item">
                <span>SMTP (php.ini):</span>
                <span><?php echo ini_get('SMTP') ?: 'Not configured'; ?></span>
            </div>
        </div>

        <div class="section">
            <h2>🔒 Security Settings</h2>
            
            <div class="check-item">
                <span>allow_url_fopen:</span>
                <span class="<?php echo ini_get('allow_url_fopen') ? 'status-warning' : 'status-ok'; ?>">
                    <?php echo ini_get('allow_url_fopen') ? 'Enabled (consider disabling)' : 'Disabled ✓'; ?>
                </span>
            </div>
            
            <div class="check-item">
                <span>allow_url_include:</span>
                <span class="<?php echo ini_get('allow_url_include') ? 'status-error' : 'status-ok'; ?>">
                    <?php echo ini_get('allow_url_include') ? 'Enabled (security risk!)' : 'Disabled ✓'; ?>
                </span>
            </div>
            
            <div class="check-item">
                <span>expose_php:</span>
                <span class="<?php echo ini_get('expose_php') ? 'status-warning' : 'status-ok'; ?>">
                    <?php echo ini_get('expose_php') ? 'Enabled (consider disabling)' : 'Disabled ✓'; ?>
                </span>
            </div>
            
            <div class="check-item">
                <span>display_errors:</span>
                <span class="<?php echo ini_get('display_errors') ? 'status-warning' : 'status-ok'; ?>">
                    <?php echo ini_get('display_errors') ? 'Enabled (disable in production)' : 'Disabled ✓'; ?>
                </span>
            </div>
        </div>

        <div class="section">
            <h2>🗂️ Required Extensions</h2>
            
            <?php
            $required_extensions = [
                'json' => 'JSON processing',
                'mbstring' => 'Multi-byte string handling',
                'filter' => 'Input filtering',
                'session' => 'Session management',
                'hash' => 'Hashing functions'
            ];
            
            foreach ($required_extensions as $ext => $description): ?>
                <div class="check-item">
                    <span><?php echo $ext; ?> <small>(<?php echo $description; ?>)</small>:</span>
                    <span class="<?php echo extension_loaded($ext) ? 'status-ok' : 'status-error'; ?>">
                        <?php echo extension_loaded($ext) ? 'Loaded ✓' : 'Missing ✗'; ?>
                    </span>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="section">
            <h2>🔧 Configuration Limits</h2>
            
            <div class="check-item">
                <span>Memory Limit:</span>
                <span><?php echo ini_get('memory_limit'); ?></span>
            </div>
            
            <div class="check-item">
                <span>Max Execution Time:</span>
                <span><?php echo ini_get('max_execution_time'); ?> seconds</span>
            </div>
            
            <div class="check-item">
                <span>Post Max Size:</span>
                <span><?php echo ini_get('post_max_size'); ?></span>
            </div>
            
            <div class="check-item">
                <span>Upload Max Filesize:</span>
                <span><?php echo ini_get('upload_max_filesize'); ?></span>
            </div>
            
            <div class="check-item">
                <span>Max Input Vars:</span>
                <span><?php echo ini_get('max_input_vars'); ?></span>
            </div>
        </div>

        <div class="section">
            <h2>📁 File System</h2>
            
            <div class="check-item">
                <span>API Directory:</span>
                <span class="<?php echo is_dir('api') ? 'status-ok' : 'status-warning'; ?>">
                    <?php echo is_dir('api') ? 'Exists ✓' : 'Not found (create it)'; ?>
                </span>
            </div>
            
            <div class="check-item">
                <span>Contact Script:</span>
                <span class="<?php echo file_exists('api/contact.php') ? 'status-ok' : 'status-warning'; ?>">
                    <?php echo file_exists('api/contact.php') ? 'Found ✓' : 'Not uploaded yet'; ?>
                </span>
            </div>
            
            <div class="check-item">
                <span>.htaccess File:</span>
                <span class="<?php echo file_exists('.htaccess') ? 'status-ok' : 'status-warning'; ?>">
                    <?php echo file_exists('.htaccess') ? 'Found ✓' : 'Not found'; ?>
                </span>
            </div>
            
            <div class="check-item">
                <span>Writable Temp Directory:</span>
                <span class="<?php echo is_writable(sys_get_temp_dir()) ? 'status-ok' : 'status-error'; ?>">
                    <?php echo is_writable(sys_get_temp_dir()) ? 'Yes ✓' : 'No ✗'; ?>
                </span>
            </div>
        </div>

        <div class="section">
            <h2>📊 Recommendations</h2>
            
            <?php
            $recommendations = [];
            
            if (version_compare(PHP_VERSION, '8.0.0', '<')) {
                $recommendations[] = "Consider upgrading to PHP 8.0+ for better performance and security.";
            }
            
            if (!function_exists('mail')) {
                $recommendations[] = "Email functionality is not available. Contact your hosting provider.";
            }
            
            if (ini_get('display_errors')) {
                $recommendations[] = "Disable display_errors in production for security.";
            }
            
            if (ini_get('allow_url_include')) {
                $recommendations[] = "Disable allow_url_include immediately - it's a security risk.";
            }
            
            if (!file_exists('api/contact.php')) {
                $recommendations[] = "Upload the contact.php script to the api/ directory.";
            }
            
            if (!file_exists('.htaccess')) {
                $recommendations[] = "Upload the .htaccess file for security configuration.";
            }
            
            if (empty($recommendations)) {
                echo '<div class="info"><strong>✅ All checks passed!</strong> Your server appears to be properly configured for the SecurHUB contact form.</div>';
            } else {
                foreach ($recommendations as $rec) {
                    echo '<div class="warning">⚠️ ' . $rec . '</div>';
                }
            }
            ?>
        </div>

        <div class="section">
            <h2>🚀 Next Steps</h2>
            <ol>
                <li>Address any warnings or errors shown above</li>
                <li>Upload the contact form files to your server</li>
                <li>Test the contact form with <code>test-contact.php</code></li>
                <li><strong>Delete this file and test-contact.php after verification</strong></li>
                <li>Monitor your server logs for any issues</li>
            </ol>
        </div>

        <div class="info">
            <strong>Current Time:</strong> <?php echo date('Y-m-d H:i:s T'); ?><br>
            <strong>Timezone:</strong> <?php echo date_default_timezone_get(); ?>
        </div>
    </div>
</body>
</html>