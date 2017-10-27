import java.io.*; 
import java.util.Map;
import java.util.HashMap;

import java.util.Base64;
import java.io.UnsupportedEncodingException;

import java.awt.Robot;
import java.awt.MouseInfo;
import java.awt.event.InputEvent;


public class Rook {

  public static void main(String[] args) throws Exception{


	 String inputFile="";
	 byte[] inputDataBytes=null;

	 if (args.length > 0) {
		inputFile=args[0];	
	 }else{
       System.err.println("Needs a file path");
       System.exit(1);
	 }


	 try {
	 	InputStream inputStream = new FileInputStream(inputFile);
		long fileSize = new File(inputFile).length();
 
		inputDataBytes = new byte[(int) fileSize];
		inputStream.read(inputDataBytes);
 
    } catch (IOException ex) {
       System.err.println("File Issue");
       ex.printStackTrace();
       System.exit(2);
    }



 	 Console c = System.console();
    if (c == null) {
       System.err.println("No console.");
       System.exit(3);
    }

	 String b64data="";
	 int delayAction = 5; // milliseconds
	 int delayXAction = 5; // milliseconds
	 int xMapDrift = 47; // pixels between centers of tiles in image map on X
	 int yMapDrift = 47; // pixels between centers of tiles in image map on Y

	 Map <Character, Integer> hm = new HashMap<Character, Integer>();

	 Character[][] charsetTbl = {
			{'A','B','C','D','E','F','G','H'},
			{'I','J','K','L','M','N','O','P'},
			{'Q','R','S','T','U','V','W','X'},
			{'Y','Z','a','b','c','d','e','f'},
			{'g','h','i','j','k','l','m','n'},
			{'o','p','q','r','s','t','u','v'},
			{'w','x','y','z','0','1','2','3'},
			{'4','5','6','7','8','9','+','/'},
			{'='}
		};

	 Integer[][] charsetMap = {
			{11,12,13,14,15,16,17,18},
			{21,22,23,24,25,26,27,28},
			{31,32,33,34,35,36,37,38},
			{41,42,43,44,45,46,47,48},
			{51,52,53,54,55,56,57,58},
			{61,62,63,64,65,66,67,68},
			{71,72,73,74,75,76,77,78},
			{81,82,83,84,85,86,87,88},
			{91}
		};

	 for ( int rowi = 0; rowi < charsetTbl.length; rowi++ ){
	 		for ( int coli = 0; coli < charsetTbl[rowi].length; coli++ ){
				hm.put(charsetTbl[rowi][coli], charsetMap[rowi][coli]);
	 		}
	 }

	 // Encode using basic encoder

	 
	 b64data = Base64.getEncoder().encodeToString(inputDataBytes);
	 System.out.println("Base64 Encoded String (Basic) :" + b64data);

	 // Get Current position of center of first tile
	 String enter = c.readLine("Point mouse to the center of first tile, press <Enter> ");	  
	 int originX = (int) MouseInfo.getPointerInfo().getLocation().getX();
	 int originY = (int) MouseInfo.getPointerInfo().getLocation().getY();
	 System.err.println("Origin X: " + originX + "Y: " + originY);

    Robot r = new Robot();
	 //r.setAutoDelay(2);
    r.setAutoWaitForIdle(true);

	 r.delay(4000); // wait 4 seconds to make the target window active. Otherwise robot looses 
						 // first mouse click to focus the target window.

	 /*
	 // Macbook keyboard layout
	 Keyboard keyboard = new Keyboard(r);

	 // Simulate typing
	 keyboard.type(new String(Base64.getDecoder().decode(b64data)));
	 System.exit(4);
    */

	 int row, col, xPixel, yPixel;
	 for (int i = 0; i < b64data.length(); i++){
		 Character ckey = b64data.charAt(i);        
		 if(hm.containsKey(ckey)){
			Integer cvalue = hm.get(ckey);
			row = cvalue / 10;	// which row in the matrix
			col = cvalue % 10;   // which column in the matrix	
			xPixel = originX + ((col-1) * xMapDrift); // mouse X (origin) + offset from row into colum of a tile 
																	// adjust first column has no offset 
			yPixel = originY + ((row-1) * yMapDrift); // mouse Y (origin) + offset from row into row of a tile 
																	// adjust first row has no offset 
		 	System.out.println(ckey + ":" + cvalue  
						+ " (Row: " + row + ", Col: " + col + ")" 
						+ " [X:" + xPixel + " Y:" + yPixel + " ]" );
			 r.mouseMove(xPixel,yPixel);
			 r.delay(delayAction);
			 r.mousePress( InputEvent.BUTTON1_DOWN_MASK );
			 r.delay(delayAction);
			 r.mouseRelease( InputEvent.BUTTON1_DOWN_MASK );

			 r.delay(delayXAction); // Wait between actions
		 }
	 }
	 

    //Thread.sleep(2000);
  }
}
    
