import subprocess

# Command to convert MP4 to Y4M using FFmpeg
#command = 'ffmpeg -i QR.mp4 -pix_fmt yuv420p ROI.y4m'
command = 'ffmpeg -i QR.mp4 -map 0:0 -pix_fmt yuv420p ROI.y4m'
# command = 'ffmpeg -i QR.mp4 -pix_fmt yuv420p -vf scale=320:240 ROI.y4m'

# Execute the command
subprocess.run(command, shell=True)