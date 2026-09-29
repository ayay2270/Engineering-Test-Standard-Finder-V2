param(
  [string]$Source = 'C:\Users\user\Downloads\logo-preview.png'
)

Add-Type -AssemblyName System.Drawing
$sourceImage = [System.Drawing.Bitmap]::FromFile($Source)
$outputDir = Join-Path $PSScriptRoot '..\src\assets\standards'
New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
$items = @(
  @{ Name = 'ista-logo.png'; Rect = [System.Drawing.Rectangle]::new(120, 98, 246, 79) },
  @{ Name = 'astm-logo.png'; Rect = [System.Drawing.Rectangle]::new(591, 87, 138, 108) },
  @{ Name = 'iso-logo.png'; Rect = [System.Drawing.Rectangle]::new(179, 347, 128, 108) },
  @{ Name = 'iec-logo.png'; Rect = [System.Drawing.Rectangle]::new(601, 345, 116, 109) }
)

try {
  foreach ($item in $items) {
    $crop = $sourceImage.Clone($item.Rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $canvas = [System.Drawing.Bitmap]::new(240, 112, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    try {
      $graphics.Clear([System.Drawing.Color]::Transparent)
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $scale = [Math]::Min(220 / $crop.Width, 100 / $crop.Height)
      $width = [int][Math]::Round($crop.Width * $scale)
      $height = [int][Math]::Round($crop.Height * $scale)
      $dest = [System.Drawing.Rectangle]::new([int]((240 - $width) / 2), [int]((112 - $height) / 2), $width, $height)
      $graphics.DrawImage($crop, $dest)
    } finally {
      $graphics.Dispose()
      $crop.Dispose()
    }

    # Remove only white background connected to the crop's outer edge.
    $visited = [System.Collections.Generic.HashSet[int]]::new()
    $queue = [System.Collections.Generic.Queue[int]]::new()
    for ($x = 0; $x -lt 240; $x++) { $queue.Enqueue($x); $queue.Enqueue(111 * 240 + $x) }
    for ($y = 0; $y -lt 112; $y++) { $queue.Enqueue($y * 240); $queue.Enqueue($y * 240 + 239) }
    while ($queue.Count -gt 0) {
      $index = $queue.Dequeue()
      if (-not $visited.Add($index)) { continue }
      $x = $index % 240
      $y = [int][Math]::Floor($index / 240)
      $color = $canvas.GetPixel($x, $y)
      if ($color.A -eq 0 -or ($color.R -ge 245 -and $color.G -ge 245 -and $color.B -ge 245)) {
        $canvas.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        if ($x -gt 0) { $queue.Enqueue($index - 1) }
        if ($x -lt 239) { $queue.Enqueue($index + 1) }
        if ($y -gt 0) { $queue.Enqueue($index - 240) }
        if ($y -lt 111) { $queue.Enqueue($index + 240) }
      }
    }
    try {
      $canvas.Save((Join-Path $outputDir $item.Name), [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $canvas.Dispose()
    }
  }
} finally {
  $sourceImage.Dispose()
}
