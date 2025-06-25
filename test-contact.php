<?php
/**
 * Test file for SecurHUB Contact Form
 * Access via: yourdomain.com/test-contact.php
 * DELETE THIS FILE AFTER TESTING!
 */

// Remove this file in production!
if ($_SERVER['SERVER_NAME'] !== 'localhost' && !isset($_GET['allow_test'])) {
    die('Test file disabled in production. Add ?allow_test=1 to URL if needed.');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecurHUB Contact Form Test</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; color: #333; }
        input, textarea, select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
        textarea { height: 120px; resize: vertical; }
        button { background: #1f2937; color: white; padding: 12px 30px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
        button:hover { background: #374151; }
        button:disabled { background: #9ca3af; cursor: not-allowed; }
        .result { margin-top: 20px; padding: 15px; border-radius: 4px; }
        .success { background: #d1fae5; border: 1px solid #10b981; color: #065f46; }
        .error { background: #fee2e2; border: 1px solid #ef4444; color: #991b1b; }
        .test-info { background: #dbeafe; border: 1px solid #3b82f6; color: #1e40af; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        .status-check { background: #f3f4f6; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        .status-item { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .status-ok { color: #10b981; font-weight: bold; }
        .status-error { color: #ef4444; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>SecurHUB Contact Form Test</h1>
        
        <div class="test-info">
            <strong>⚠️ Important:</strong> This is a test file. Delete it after verifying the setup works correctly!
        </div>

        <div class="status-check">
            <h3>System Status Check</h3>
            
            <div class="status-item">
                <span>PHP Version:</span>
                <span class="<?php echo version_compare(PHP_VERSION, '7.4.0', '>=') ? 'status-ok' : 'status-error'; ?>">
                    <?php echo PHP_VERSION; ?>
                </span>
            </div>
            
            <div class="status-item">
                <span>Mail Function:</span>
                <span class="<?php echo function_exists('mail') ? 'status-ok' : 'status-error'; ?>">
                    <?php echo function_exists('mail') ? 'Available' : 'Not Available'; ?>
                </span>
            </div>
            
            <div class="status-item">
                <span>Contact Script:</span>
                <span class="<?php echo file_exists('api/contact.php') ? 'status-ok' : 'status-error'; ?>">
                    <?php echo file_exists('api/contact.php') ? 'Found' : 'Missing'; ?>
                </span>
            </div>
            
            <div class="status-item">
                <span>Sessions:</span>
                <span class="<?php echo function_exists('session_start') ? 'status-ok' : 'status-error'; ?>">
                    <?php echo function_exists('session_start') ? 'Available' : 'Not Available'; ?>
                </span>
            </div>
        </div>

        <form id="testForm">
            <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" value="test@example.com" required>
            </div>

            <div class="form-group">
                <label for="organization">Organization (Optional)</label>
                <input type="text" id="organization" name="organization" value="Test Company Ltd.">
            </div>

            <div class="form-group">
                <label for="phone">Phone (Optional)</label>
                <input type="text" id="phone" name="phone" value="+48 123 456 789">
            </div>

            <div class="form-group">
                <label for="companySize">Company Size</label>
                <select id="companySize" name="companySize">
                    <option value="wole-nie-mowic">I'll provide later</option>
                    <option value="<50">Less than 50 employees</option>
                    <option value="50-249" selected>50 - 249 employees</option>
                    <option value="250+">Over 250 employees</option>
                </select>
            </div>

            <div class="form-group">
                <label for="message">Message *</label>
                <textarea id="message" name="message" required>This is a test message to verify the contact form is working correctly. Please ignore this test submission.</textarea>
            </div>

            <div class="form-group">
                <label for="language">Language</label>
                <select id="language" name="language">
                    <option value="en">English</option>
                    <option value="pl" selected>Polski</option>
                </select>
            </div>

            <button type="submit" id="submitBtn">Send Test Message</button>
        </form>

        <div id="result"></div>
    </div>

    <script>
        document.getElementById('testForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const resultDiv = document.getElementById('result');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            resultDiv.innerHTML = '';
            
            try {
                const formData = new FormData(this);
                
                const response = await fetch('/api/contact.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = `
                        <div class="result success">
                            <strong>✅ Success!</strong> Test email sent successfully. 
                            Check biuro@securhub.pl for the test message.
                        </div>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <div class="result error">
                            <strong>❌ Error:</strong> ${data.message}
                            ${data.errors ? '<br>Errors: ' + data.errors.join(', ') : ''}
                        </div>
                    `;
                }
            } catch (error) {
                resultDiv.innerHTML = `
                    <div class="result error">
                        <strong>❌ Network Error:</strong> ${error.message}
                        <br>Check console for more details.
                    </div>
                `;
                console.error('Error:', error);
            }
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Test Message';
        });
    </script>
</body>
</html>