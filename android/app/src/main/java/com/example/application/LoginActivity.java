package com.example.application;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.Serializable;
import java.util.concurrent.ExecutionException;

import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class LoginActivity extends AppCompatActivity {

    private Button btnCo;
    private EditText login,pass;
    private TextView labelCo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        login = findViewById(R.id.txtLogin);
        pass = findViewById(R.id.txtPass);
        labelCo = findViewById(R.id.labelCo);

        Button btnCo = findViewById(R.id.btnCo);
        btnCo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                connect();
            }
        });

    }

    private void connect() {
        JSONObject jsonrequest = createJSON(login,pass);

        AsyncTask<JSONObject, Void, JSONObject> task = new Login().execute(jsonrequest);
        try {
            JSONObject result = task.get();
            labelCo.setText(result.toString());
            /*Intent i = new Intent(LoginActivity.this,AccueilActivity.class);
            i.putExtra("donnee", (Serializable) result);
            startActivity(i);*/
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    private JSONObject createJSON(TextView login, TextView pass){
        JSONObject json = new JSONObject();

        try {
            json.put("login", login.getText());
            json.put("pass", pass.getText());
        } catch(JSONException e){
            e.printStackTrace();
        }

        return json;
    }


    private class Login extends AsyncTask<JSONObject, Void, JSONObject> {
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");
        String URL = "https://jsonplaceholder.typicode.com/posts";
        JSONObject jsonRep;
        @Override
        protected JSONObject doInBackground(JSONObject... jsonObjects) {
            try {
                OkHttpClient okHttpClient = new OkHttpClient();
                JSONObject jsonReq = jsonObjects[0];
                RequestBody reqBody = RequestBody.create(JSON, jsonReq.toString());
                Request req = new Request.Builder()
                        .url(URL)
                        .post(reqBody)
                        .build();

                Response rep = okHttpClient.newCall(req).execute();

                if(rep.isSuccessful()) {
                    jsonRep = new JSONObject(rep.body().string());
                    return jsonRep;
                }
            }catch(Exception e) {
                e.printStackTrace();
            }
            return jsonRep;
        }
    }

}
