#include<ESP8266WiFi.h>
#include<WiFiClient.h>
#include<ESP8266WebServer.h>
#include<IRremote.hpp>

int LED = 12; //D1
  
const char* ssid= "iPhone de Gabriel";
const char* password="fpga4782";

ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  pinMode(LED, OUTPUT);

  digitalWrite(LED, LOW);;
  
  IrSender.begin(12, true);
  WiFi.begin(ssid, password);
  while(WiFi.status()!=WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("NodeMCU conectado ao IP: ");
  Serial.println(WiFi.localIP());
  Serial.println("Conexão efetuada com sucesso!");

  server.begin();
  Serial.println("Webserver inicializado");
  delay(500);
  Serial.println("Acesse o endereço pelo: ");
  Serial.println (WiFi.localIP());

  

  server.on("/", [](){
    server.send(200, "cabeçalho da requisição","Bem Vindo ao Servidor!");

  });

  server.on("/on", [] (){
    server.send(200, "cabeçalho", "Led acessa!");
    //digitalWrite(LED, HIGH);
    uint64_t sAddress = 0x8;
    uint8_t sCommand = 0x3D;
    uint8_t sRepeats = 0; 
    IrSender.sendPanasonic(sAddress, sCommand, sRepeats);
    delay(1000);
  });

  server.on("/off", [] (){
    server.send(200, "cabeçalho", "Led apagada!");
    //digitalWrite(LED, LOW);
    uint64_t sAddress = 0x8;
    uint8_t sCommand = 0x3D;
    uint8_t sRepeats = 0; 
    IrSender.sendPanasonic(sAddress, sCommand, sRepeats);
    delay(1000);
  });

}

void loop() {

  server.handleClient();
}
