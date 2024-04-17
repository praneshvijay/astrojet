# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from time import sleep
# import cv2
# import subprocess
# import os
# import spacy  

# import sys
 

# n = len(sys.argv)

# data = sys.argv[1]
# data = data.split(" ")
# name1 = ""


# for i in range(1, len(data)):
#     name1+=data[i]


# # import base64
# # import io
# # from PIL import Image


# # def pillow_image_to_base64_string(img):
# #     buffered = io.BytesIO()
# #     img.save(buffered, format="PNG")
# #     return base64.b64encode(buffered.getvalue()).decode("utf-8")


# # def base64_string_to_pillow_image(base64_str):
# #     return Image.open(io.BytesIO(base64.decodebytes(bytes(base64_str, "utf-8"))))


# # # Example for Converting pillow image to base64 data URL to view in browser
# # my_img = Image.open('certificate.png')
# # data_url = 'data:image/jpeg;base64,' + pillow_image_to_base64_string(my_img)
# # # You can put this data URL in the address bar of your browser to view the image


# # import the necessary packages
# import numpy as np
# import sys

# if sys.version_info[0] == 3:
#     from urllib.request import urlopen
# else:
#     # Not Python 3 - today, it is most likely to be Python 2
#     # But note that this might need an update when Python 4
#     # might be around one day
#     from urllib import urlopen

# import cv2
# # METHOD #1: OpenCV, NumPy, and urllib
# def url_to_image(url):
#     req = urlopen(url)
#     arr = np.asarray(bytearray(req.read()),dtype = np.uint8)
#     img = cv2.imdecode(arr, -1)
#     return img

# #image = url_to_image(data[0])
# image= cv2.imread("pranesh.jpg")
# original = image.copy()
# gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# blur = cv2.GaussianBlur(gray, (9,9), 0)
# thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

# # Morph close
# kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
# close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)

# # Find contours and filter for QR code
# cnts = cv2.findContours(close, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
# cnts = cnts[0] if len(cnts) == 2 else cnts[1]
# for c in cnts:
#     peri = cv2.arcLength(c, True)
#     approx = cv2.approxPolyDP(c, 0.04 * peri, True)
#     x,y,w,h = cv2.boundingRect(approx)
#     area = cv2.contourArea(c)
#     ar = w / float(h)
#     if len(approx) == 4 and area > 1000 and (ar > .85 and ar < 1.3):
#         cv2.rectangle(image, (x, y), (x + w, y + h), (36,255,12), 3)
#         ROI = original[y-5:y+h+5, x-5:x+w+5]
     


# cv2.imshow('ROI', ROI)
# cv2.imwrite('ROI.jpg',ROI)



# # Create a VideoWriter object
# fourcc = cv2.VideoWriter_fourcc(*"mp4v")
# video = cv2.VideoWriter("QR.mp4", fourcc, 20.0, (ROI.shape[0],ROI.shape[1]))

# # Iterate over the images and write them to the video
# for _ in range(20):
    
#     video.write(ROI)

# # Release the VideoWriter object
# video.release()



# # Command to convert MP4 to Y4M using FFmpeg
# #command = 'ffmpeg -i QR.mp4 -pix_fmt yuv420p ROI.y4m'
# command = 'ffmpeg -i QR.mp4 -pix_fmt yuv420p ROI.y4m'
# # command = 'ffmpeg -i QR.mp4 -pix_fmt yuv420p -vf scale=320:240 ROI.y4m'

# # Execute the command
# subprocess.run(command, shell=True)


 
# options = webdriver.ChromeOptions()
# options.add_argument("--use-fake-ui-for-media-stream")
# options.add_argument("--use-fake-device-for-media-stream")
# options.add_argument('--use-file-for-fake-video-capture='+os.getcwd()+'/ROI.y4m')
# # your driver goes here
# driver = webdriver.Chrome(options=options)

# driver.get('https://verify.cowin.gov.in')


# driver.find_element(By.CLASS_NAME, "green-btn").click()

# sleep(3)

# name = driver.find_element(By.CLASS_NAME, "value-col").text

# if not name:
#     print("reject",end="")
#     exit(1)




# name = name.split()
# name1 = ""
# for n1 in name:
#     name1+=n1
# name = name1



# os.remove(os.getcwd()+"/QR.mp4")
# os.remove(os.getcwd()+'/ROI.y4m')
# os.remove(os.getcwd()+"/ROI.jpg")




  
# nlp = spacy.load('en_core_web_sm') 
  


# token1 = nlp(name)
# token2 = nlp(name1)

# val = token2.similarity(token1)
# if val>0.5:
#     print("accepted")
#     exit(0)
# else:
#     print("rejected")
#     exit(1)


from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep
import cv2
import subprocess
import os
import spacy  
import imageio
import sys

IMAGES = 10

def clean_string(name):
        name_final = ""
        for ch in name:
            if ch<='z' and ch>='a' or ch<='Z' and ch>='A':
                name_final+=ch
            else:
                name_final+=" "
        return name_final
 

n = len(sys.argv)

data = sys.argv[1]
[urls, names] = data.split("|||||")
urls = urls.split(" ")
names = names.split("|")

print("urls = ", urls)
print("names = ", names)
url_name = []
for i in range(len(urls)):
    url_name.append((urls[i], names[i]))

name1 = ""




for i in range(1, len(data)):
    name1+=data[i]


# import base64
# import io
# from PIL import Image


# def pillow_image_to_base64_string(img):
#     buffered = io.BytesIO()
#     img.save(buffered, format="PNG")
#     return base64.b64encode(buffered.getvalue()).decode("utf-8")


# def base64_string_to_pillow_image(base64_str):
#     return Image.open(io.BytesIO(base64.decodebytes(bytes(base64_str, "utf-8"))))


# # Example for Converting pillow image to base64 data URL to view in browser
# my_img = Image.open('certificate.png')
# data_url = 'data:image/jpeg;base64,' + pillow_image_to_base64_string(my_img)
# # You can put this data URL in the address bar of your browser to view the image


# import the necessary packages
import numpy as np
import sys

if sys.version_info[0] == 3:
    from urllib.request import urlopen
else:
    # Not Python 3 - today, it is most likely to be Python 2
    # But note that this might need an update when Python 4
    # might be around one day
    from urllib import urlopen

import cv2
# METHOD #1: OpenCV, NumPy, and urllib
def url_to_image(url):
    req = urlopen(url)
    arr = np.asarray(bytearray(req.read()),dtype = np.uint8)
    img = cv2.imdecode(arr, -1)
    return img


print("len(url_name) = ", len(url_name))


for url, name1 in url_name:


    image = url_to_image(url)
    # cv2.imshow("image",image)
    # cv2.waitKey(0)
    # qrCodeDetector = cv2.QRCodeDetector()
    # decodedText, points, _ = qrCodeDetector.detectAndDecode(image)
    # print("points = ",points)
    # if points == None:
    #     print("points is None")
    #     exit(1)
    # points = points.squeeze(axis = 1)
    # y1 = (points[0][0]+points[3][0])/2
    # y2 = (points[1][0]+points[2][0])/2
    # x1 = (points[0][1]+points[1][1])/2
    # x2 = (points[2][1]+points[3][1])/2
    # x1 =int(x1)
    # x2 =int(x2)
    # y1 =int(y1)
    # y2 =int(y2)

    # print(x1,x2,y1,y2)
    # print(image.shape)
    # ROI = image[x1-10:x2+10, y1-10:y2+10]
    # print(ROI.shape)

    # cv2.imshow("ROI.jpg", ROI)
    # cv2.waitKey(2)
    # cv2.imwrite('ROI.jpg',ROI)

    # Create a VideoWriter object
    # fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    # video = cv2.VideoWriter("QR.mp4", fourcc, 20.0, (ROI.shape[0],ROI.shape[1]))

    # # Iterate over the images and write them to the video
    # for _ in range(20):
        
    #     video.write(ROI)

    # # Release the VideoWriter object
    # video.release()

    original = image.copy()
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (9,9), 0)
    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    # Morph close
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
    close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)

    # Find contours and filter for QR code
    cnts = cv2.findContours(close, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    for c in cnts:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.04 * peri, True)
        x,y,w,h = cv2.boundingRect(approx)
        area = cv2.contourArea(c)
        ar = w / float(h)
        if len(approx) == 4 and area > 1000 and (ar > .85 and ar < 1.3):
            cv2.rectangle(image, (x, y), (x + w, y + h), (36,255,12), 3)
            ROI = original[y-5:y+h+5, x-5:x+w+5]

    image_stack = np.ones((2, 2, 18))

    extra_left, extra_right = 20, 20
    extra_top, extra_bottom = 20, 20

    ROI = np.pad(ROI, ((extra_top, extra_bottom), (extra_left, extra_right), (0, 0)),
        mode='constant', constant_values=255) 
        
    cv2.imwrite('ROI.png',ROI)
    ROI = cv2.imread('ROI.png')

    # Create a VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    video = cv2.VideoWriter("QR.mp4", fourcc, 20.0, (ROI.shape[0],ROI.shape[1]))

    # Iterate over the images and write them to the video
    for _ in range(20):
        
        video.write(ROI)

    # Release the VideoWriter object
    video.release()

    # cv2.imshow("ROI",ROI)
    # cv2.waitKey(0)
    # for i in range(IMAGES):
    #     # cv2.imwrite(f'{i}.jpg', img)

    #     cv2.imwrite(os.getcwd()+'/img-{}.png'.format(i),ROI)
    #     # os.remove(r'images/image{}.png'.format(i))
    
    # sleep(10)


    # Command to convert MP4 to Y4M using FFmpeg
    # command = ' ffmpeg -i QR.mp4 -vf fps=20 -an -f yuv4mpegpipe -y ROI.y4m'
    command = 'ffmpeg -i QR.mp4 -map 0:0 -pix_fmt yuv420p ROI.y4m'

    # Execute the command
    subprocess.run(command, shell=True)
    # command = "ffmpeg -r 0.01 -loop 1 -i ROI.png -c:v libx264 -tune stillimage -preset  ultrafast -ss 00:00:00 -t 00:00:27   -c:a aac  -b:a 96k -pix_fmt yuv420p  -shortest output.y4m"

    # command = "ffmpeg -framerate 30 -i ROI.png -c:v libx264 -t 15 -pix_fmt yuv420p output.y4m"
    # command = "ffmpeg -framerate 10 -i img-%d.png -pix_fmt yuv420p -y output.y4m"
    # subprocess.run(command,shell = True)
    # subprocess.run("sed -i '0,/C420mpeg2/s//C420/' *.y4m", shell =True)
    # subprocess.run("ffmpeg -v error -i ROI.y4m -f null -", shell = True)
    # for i in range(IMAGES):
    #     if os.path.exists(os.getcwd()+'/img-{}.png'.format(i)):
    #         os.remove(os.getcwd()+'/img-{}.png'.format(i))

    

    # Open the y4m video file
    # video_reader = imageio.get_reader(os.getcwd()+'/output.y4m')

    # # Iterate through each frame in the video
    # for frame in video_reader:
    #     # Display the frame
    #     imageio.imshow(frame)
    #     imageio.show()

    # options = webdriver.ChromeOptions()
    # options.add_argument("--use-fake-ui-for-media-stream")
    # options.add_argument("--use-fake-device-for-media-stream")
    # options.add_argument(r'--use-file-for-fake-video-capture='+os.getcwd()+'/output.y4m')




    # Command to convert MP4 to Y4M using FFmpeg
    # command = 'ffmpeg -i QR.mp4 -pix_fmt yuv420p ROI.y4m'

    # # Execute the command
    # subprocess.run(command, shell=True)


    
    options = webdriver.ChromeOptions()
    options.add_argument("--use-fake-ui-for-media-stream")
    options.add_argument("--use-fake-device-for-media-stream")
    options.add_argument('--use-file-for-fake-video-capture='+os.getcwd()+'/ROI.y4m')
    # your driver goes here
    driver = webdriver.Chrome(options=options)

    driver.get('https://verify.cowin.gov.in')


    driver.find_element(By.CLASS_NAME, "green-btn").click()

    sleep(3)

    name = driver.find_element(By.CLASS_NAME, "value-col").text
    # os.remove(os.getcwd()+"/output.y4m")

    os.remove(os.getcwd()+"/QR.mp4")
    os.remove(os.getcwd()+'/ROI.y4m')
    os.remove(os.getcwd()+"/ROI.png")
    if not name:
        print("reject",end="")
        exit(1)

    # name_list = name.split()
    # name = ""
    # for n1 in name_list:
    #     name+=n1
    
    # name_list = name1.split()
    # name1 = ""
    # for n1 in name_list:
    #     name1+=n1
 
    print("name = ",name)
    print("name1 = ",name1)

    

    name = clean_string(name)
    name_arg = clean_string(name1)
    name = name.lower()
    name_arg = name_arg.lower()
    name = name.split()
    name_arg = name_arg.split()
    name.sort()
    name_arg.sort()
    name_final = ""
    for n1 in name:
        name_final+=n1+" "
    name_arg_final = ""
    for n1 in name_arg:
        name_arg_final+= n1+" "
    name_arg = name_arg_final
    name = name_final

    print(name)
    print(name_arg)

    nlp = spacy.load('en_core_web_sm') 
    token1 = nlp(name)
    token2 = nlp(name_arg)

    val = token2.similarity(token1)
    print(val)
    if val<0.5:
        exit(1)

exit(0)